import express from "express";
import { getAllBusinesses, getBusinessById, signIn, signup } from "../controllers/Auth.js";
const router = express.Router();
router.post("/signin", signIn);
router.post("/signup", signup);
router.get("/getBussiness", getAllBusinesses);
router.get("/getBusinessById/:_id", getBusinessById)
export default router;
