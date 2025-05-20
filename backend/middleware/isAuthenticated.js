import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({
                message: "Please login first",
                success: false
            });
        }

        // Add a check for SECRET_KEY
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false
        });
    }
};