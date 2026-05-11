import jwt from "jsonwebtoken";
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError("Invalid email or password", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError("Invalid email or password", 401));
    }

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
});
