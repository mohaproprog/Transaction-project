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

app.get("/",(req,res)=>{
    res.send("hello word")
})
app.get("/admin",(req,res)=>{
    res.send("hello admin")
})

//using error handles at the last
app.use(notFound);
app.use(globalError)
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`);
    
})



