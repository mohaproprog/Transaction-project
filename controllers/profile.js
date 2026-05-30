import Transaction from "../module/transaction.js";

export const profile = async (req, res, next) => {
    try {
        const user = req.user;

        const transactions = await Transaction.find({
            createdBy: user._id
        }).sort({ createdAt: -1 });

        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            if (t.type === "income") income += t.amount;
            if (t.type === "expense") expense += t.amount;
        });

        res.status(200).json({
            message: "profile fetched",
            user,
            summary: {
                income,
                expense,
                balance: income - expense
            },
            transactions
        });

    } catch (error) {
        next(error);
    }
};

export const lastMonthProfile = async (req, res, next) => {
    try {
        const user = req.user;

        const date = new Date();
        
        console.log(user);
        const now = new Date();
       const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
       const endOfMonth = new Date(now.getFullYear(), now.getMonth() +1, 1);

       console.log(startOfMonth,"date is:",date);
       

       const transaction = await Transaction.find(
        {   createdBy:user._id,
            date: {$gte:startOfMonth, $lt:endOfMonth}

        }
       )

       if(!transaction.length){
        return res.status(400).json({
            message:"no transaction found"
        })
       }

       res.status(200).json({
        transaction
       })
        
        
    } catch (error) {
        next(error);
    }
};