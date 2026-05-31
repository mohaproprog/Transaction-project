
import express from "express";
import { lastMonthProfile, profile } from "../controllers/profile.js";
import protect from "../middlewares/protect.js";

const router = express();

/**
 * @swagger
 * /dashboard/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get("/profile", protect, profile);
/**
 * @swagger
 * /dashboard/profile/lastMonth:
 *   get:
 *     summary: Get current the last month transactions
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get("/profile/lastMonth", protect, lastMonthProfile);

export default router;