require("dotenv").config();
import express, { NextFunction, Request, Response } from "express"
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from "./middleware/error"
import userRouter from "./router/user.route";



// body parser
app.use(express.json({limit:"50mb"}));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN
}));

// routes

app.use("/api/v1",userRouter);

// testing api

app.get("/test", (req:Request,res:Response, next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:"API is working fine"
    })
})


// unknown route

app.all("*", (req:Request,res:Response<any, Record<string, any>>, next:NextFunction)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 400;
    next(err);
})

app.use(ErrorMiddleware);