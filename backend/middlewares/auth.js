import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorHandler("Not authenticated!", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return next(new ErrorHandler("User not found!", 404));

    req.user = user; // attach user to request
    next();
  } catch (error) {
    next(new ErrorHandler("Invalid or expired token!", 401));
  }
};
