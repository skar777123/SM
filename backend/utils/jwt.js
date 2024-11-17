import dotenv from 'dotenv'
import User from '../models/userModel.js'

export const sendToken = (user,statusCode,res)=>{
    const accessToken = User.SignAccessToken();
    const refreshToken = User.SignRefrreshToken();
    
} 