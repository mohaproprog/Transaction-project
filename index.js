// importing packages
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import helmet from "helmet";





//config dotenv
import "dotenv/config"

// importing the routes 

import Authrouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import trans from './routes/transaction.js';
import upload from "./routes/upload.js"

// importing middlewares and files
import globalError from "./middlewares/globalError.js";
import notFound from "./middlewares/notFound.js";
import { swaggerSpec } from './utils/swagger.js';
import {limiter} from "./middlewares/rateLimiter.js";




//middlewares
const app = express();
app.use(express.json())
// port
const port = process.env.PORT;
const mongooseUrl = process.env.MONGOOSE_URL_DEV
app.use(cors({
    origin:["http://localhost:3000","http://dugsiiye.com"]
}))


app.use(morgan("dev"));
app.use(helmet());
app.use(limiter)

mongoose.connect(process.env.NODE_ENV === "dev"? mongooseUrl: process.env.MONGOOSE_URL_PRO)
.then(()=> console.log("mongoose connected"))
.catch((err)=> console.log("failed to connect mongoose",err)
)

app.use("/auth",Authrouter)
app.use("/dashboard",profileRouter);
app.use("/transaction",trans);
app.use("/profile",upload);
app.use("/docs", swaggerUi.serve,swaggerUi.setup(swaggerSpec));

// middlewares ended

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Transaction Management API 💰",
        description:
            "This API helps users manage their personal finances by tracking income, expenses, budgets, and transaction history. You can create transactions, monitor your spending, and view financial summaries.",
        features: [
            "User Authentication",
            "Income & Expense Tracking",
            "Transaction Management",
            "Profile Dashboard",
            "Monthly Financial Reports",
            "Budget Monitoring"
        ],
        documentation: "/docs",
        docsMessage:
            "To explore and test all available endpoints, visit /docs for the complete API documentation."
    });
});


//using error handles at the last
app.use(notFound);
app.use(globalError)
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`);
    
})



