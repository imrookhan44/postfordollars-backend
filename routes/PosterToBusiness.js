import express from "express"
import { createPosterToBusiness, getPosterToBusiness } from "../controllers/PosterToBusiness.js";

const router = express.Router();
router.post("/addBusiness", createPosterToBusiness);
router.get("/getBusiness", getPosterToBusiness);

export default router;