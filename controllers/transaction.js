import Transaction from "../module/transaction.js";
import User from "../module/user.js";

export const addTransaction = async (req, res, next) => {
    try {
        const { amount, type, category } = req.body;
        const user = req.user;

        // 🔹 get all user transactions
        const transactions = await Transaction.find({
            createdBy: user._id
        });

        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            if (t.type === "income") income += t.amount;
            if (t.type === "expense") expense += t.amount;
        });

        const balance = income - expense;

        // 🔥 if expense → check balance
        if (type === "expense") {
            if (balance < amount) {
                return res.status(400).json({
                    message: "Insufficient balance. You don’t have enough funds to complete this transaction."
                });
            }
        }

        // 🔹 save transaction
        const newTransaction = await Transaction.create({
            amount,
            type,
            category,
            createdBy: user._id
        });

        // 🔹 response
        res.status(201).json({
            message: "Transaction successful. Your finances are being tracked effectively.",
            transaction: newTransaction,
            balance: balance + (type === "income" ? amount : -amount),
        });

    } catch (error) {
        next(error);
    }
};

export const updateTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount, type, category } = req.body;
        const user = req.user;

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        if(user.role !== "admin"){
            if (transaction.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this transaction"
            });
        }

        }
        

        // 🔹 get all transactions except current one
        const transactions = await Transaction.find({
            createdBy: user._id,
            _id: { $ne: id }
        });

        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            if (t.type === "income") income += t.amount;
            if (t.type === "expense") expense += t.amount;
        });

        const balance = income - expense;

        // 🔥 if updating to expense → check balance
        if (type === "expense") {
            if (balance < amount) {
                return res.status(400).json({
                    message: "Insufficient balance after update."
                });
            }
        }

        // 🔹 update
        transaction.amount = amount ?? transaction.amount;
        transaction.type = type ?? transaction.type;
        transaction.category = category ?? transaction.category;

        await transaction.save();

        res.json({
            message: "Transaction updated successfully",
            transaction
        });

    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        
        if(user.role !== "admin"){
            if (transaction.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to delete this transaction"
            });
        }
        }

        await Transaction.findByIdAndDelete(id);

        res.json({
            message: "Transaction deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};