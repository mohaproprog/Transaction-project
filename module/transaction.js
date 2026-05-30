import mongoose from "mongoose";

const transSchema = new mongoose.Schema(
{
    amount: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

},
{ timestamps: true }
);

const Transaction = mongoose.model("Transaction", transSchema);

export default Transaction;