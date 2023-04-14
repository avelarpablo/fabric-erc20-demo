import { Router } from "express";
const { login, logout, signup } = require("../controllers/userController");
const { handleRefreshToken } = require("../controllers/refreshTokenController");

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);
router.get("/refresh", handleRefreshToken);

module.exports = router;
