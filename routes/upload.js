
import express from "express";
import protect from "../middlewares/protect.js";
import { upload } from "../middlewares/limiter.js";
import { uploadFile } from "../controllers/uploadController.js";

const router = express();

router.post("/profilePic", protect,upload.single("file"),uploadFile);

export default router;