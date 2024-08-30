require("dotenv").config();
import {Response} from "express";
import { IUser } from "../models/user.model"; 
import {redis} from "./redis"

interface ITokenOptions{
    expires:Date;
    maxAge:number;
    httpOnly:boolean;
    sameSite:'lax' | 'strict' | 'none' | undefined;
    secure?:boolean;

}

interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite:'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}

 // Parse expiration times
 const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
 const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

 // Define cookie options
 export const accessTokenOptions: ITokenOptions = {
     expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
     maxAge: accessTokenExpire * 60 * 60 * 1000,
     httpOnly: true,
     sameSite: 'lax',
 };

 export const refreshTokenOptions: ITokenOptions = {
     expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60* 1000),
     maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
     httpOnly: true,
     sameSite: 'lax',
 };

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    try {
        // Generate tokens
        const accessToken = user.SignAccessToken();
        const refreshToken = user.SignRefreshToken();

        // Log tokens for debugging
        // console.log("Access Token:", accessToken);
        // console.log("Refresh Token:", refreshToken);

        // Store user in Redis
        redis.set(user._id, JSON.stringify(user) as any)
            .catch(error => {
                console.error("Error storing user in Redis:", error);
            });

       

        // Set secure flag for production
        if (process.env.NODE_ENV === "production") {
            accessTokenOptions.secure = true;
            refreshTokenOptions.secure = true;
        }

        // Set cookies
        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        // Send response
        res.status(statusCode).json({
            success: true,
            user,
            accessToken,
        });
    } catch (error) {
        console.error("Error sending token:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};