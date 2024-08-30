import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { redis } from "../utils/redis";

// authenticated user
export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    // Log tokens for debugging
    // console.log("Access Token:", access_token);
    if (!access_token) {
        return next(new ErrorHandler("Please Login first to access this resource", 400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string);

    if (typeof decoded === 'string') {
        return next(new ErrorHandler("access token is not valid", 400));
    }

    const userId = (decoded as JwtPayload).id;
    
    if (!userId) {
        return next(new ErrorHandler("access token is not valid", 400));
    }

    const user = await redis.get(userId);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    req.user = JSON.parse(user);
    next();
});

// validate user role

export const authorizeRoles = (...roles: string[]) =>{
    return (req:Request,  res:Response, next:NextFunction)=>{
        if(!roles.includes(req.user?.role || '')){
            return next(new ErrorHandler(`Role (${req.user?.role}) is not allowed to access this resource`, 403));
        }
        next()
    }
}