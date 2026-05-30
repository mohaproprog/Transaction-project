
import express from "express";
import { addTransaction, deleteTransaction, updateTransaction } from "../controllers/transaction.js"
import protect from "../middlewares/protect.js";
import { validateZod } from "../middlewares/validateZod.js";
import transactionSchema from "../schemas/tranScheme.js";


const router = express();

/**
 * @swagger
 * /transaction/add:
 *   post:
 *     summary: Create a new transaction
 *     tags: [TRANSACTIONS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -amount
 *               -category
 *               -type 
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               dueDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction sucsess
 */

router.post("/add",protect,validateZod(transactionSchema),addTransaction);

/**
 * @swagger
 * /transaction/update/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [TRANSACTIONS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: transaction updated
 */
router.put("/update/:id", protect, validateZod(transactionSchema), updateTransaction);

/**
 * @swagger
 * /transaction/delete/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [TRANSACTIONS]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete("/delete/:id", protect, deleteTransaction);

export default router;