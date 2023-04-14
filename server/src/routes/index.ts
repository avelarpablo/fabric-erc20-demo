import { Router } from "express";
const userRoute = require("./userRoute.ts");
const tokenRoute = require("./tokenRoute.ts");

const router = Router();

router.use("/users", userRoute);
router.use("/token", tokenRoute);

module.exports = router;
