import { fabricCAServices, identityService, registrar } from "../tools/init";
import { encrypt, log } from "../tools/utils";

const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  let identityFound = null;
  try {
    identityFound = await identityService.getOne(username, registrar);
  } catch (e) {
    log.info("Identity not found, registering", e);
    res.status(400).send("Username not found");
    return;
  }

  try {
    const r = await fabricCAServices.enroll({
      enrollmentID: username,
      enrollmentSecret: password,
    });

    // Encrypt r.certificate and r.key.toBytes() to be stored in the jwt token
    const encryptedCertificate = encrypt({
      ca: r.certificate,
      key: r.key.toBytes(),
    });
    const accessToken = jwt.sign(
      {
        username: username,
        eck: encryptedCertificate,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );

    // const refreshToken = jwt.sign(
    //   {
    //     username: username,
    //     eck: encryptedCertificate,
    //   },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "1d" }
    // );

    log.info(`User ${username} logged in.`);
    res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 86400000 }); // secure: true for production
    res.json({ message: "User logged in.", jwt: accessToken });
  } catch (error) {
    res.status(401).send("Authenication failed");
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(204).send("No token found");
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true }); // secure: true for production
  res.send("User logged out").status(204);
};

const signup = async (req, res) => {
  const { username, password } = req.body;
  let identityFound = null;
  try {
    identityFound = await identityService.getOne(username, registrar);
  } catch (e) {
    log.info("Identity not found, registering", e);
  }

  if (identityFound) {
    log.error(`User ${username} already taken.`);
    res.status(400);
    res.send("Username already taken");
    return;
  }

  await fabricCAServices.register(
    {
      enrollmentID: username,
      enrollmentSecret: password,
      affiliation: "",
      role: "client",
      attrs: [],
      maxEnrollments: -1,
    },
    registrar
  );
  log.info(`User ${username} registered.`);
  res.send("New user registered!");
};

module.exports = {
  login,
  logout,
  signup,
};
