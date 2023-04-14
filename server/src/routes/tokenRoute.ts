import { Router } from "express";
import { contractCheck } from "../middleware/contractMiddleware";
const { evaluate, submit } = require("../controllers/tokenController");
const verifyJWT = require("../middleware/verifyJWT");

const router = Router();

// Add authentication before contractCheck
router.post("/evaluate", verifyJWT, contractCheck, evaluate);
router.post("/submit", verifyJWT, contractCheck, submit);

module.exports = router;
