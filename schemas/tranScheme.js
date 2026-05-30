import { z } from "zod";

const incomeCategories = ["salary", "business", "freelance", "gift", "other"];
const expenseCategories = ["food", "rent", "transport", "bills", "shopping","other"];

const transactionSchema = z.object({
    amount: z.number({
        required_error: "Amount is required"
    }).positive("Amount must be greater than zero"),

    type: z.enum(["income", "expense"], {
        required_error: "Type is required"
    }),

    category: z.string({
        required_error: "Category is required"
    }).min(1, "Category is required")
})
.superRefine((data, ctx) => {
    if (data.type === "income" && !incomeCategories.includes(data.category)) {
        ctx.addIssue({
            path: ["category"],
            message: "Invalid category for income"
        });
    }

    if (data.type === "expense" && !expenseCategories.includes(data.category)) {
        ctx.addIssue({
            path: ["category"],
            message: "Invalid category for expense"
        });
    }
});

export default transactionSchema;