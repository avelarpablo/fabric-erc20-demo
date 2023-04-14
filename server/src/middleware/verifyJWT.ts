import { decrypt } from "../tools/utils";

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.cookie;
  // const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split("=")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    const decryptedCertificate = decrypt(user.eck);
    req.username = user.username;
    req.ca = decryptedCertificate.ca;
    req.key = decryptedCertificate.key;
    next();
  });
};

module.exports = verifyJWT;
