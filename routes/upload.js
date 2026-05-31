
import express from "express";
import protect from "../middlewares/protect.js";
import { upload } from "../middlewares/limiter.js";
import { uploadFile } from "../controllers/uploadController.js";

const router = express();
/**
 * @swagger
 * /profile/profilePic:
 *   post:
 *     summary: Upload profile picture
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 */
router.post("/profilePic", protect,upload.single("file"),uploadFile);

export default router;