import { log } from "../tools/utils";

const jwt1 = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).send("No token found");
  const refreshToken = cookies.jwt;

  jwt1.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt1.sign(
      {
        username: user.username,
        ca: user.ca,
        key: user.key,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    log.info(`Token refreshed for ${user.username}`);
    res.json({ message: "Token refreshed", accessToken });
  });
};

module.exports = { handleRefreshToken };
