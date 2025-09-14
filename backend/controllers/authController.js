import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

//Login user
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email })
    .select("+password")
    .populate("tenant");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//Logout user
export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//Get profile
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate("tenant")
    .select("-password");

  res.status(200).json({
    success: true,
    user,
  });
});
