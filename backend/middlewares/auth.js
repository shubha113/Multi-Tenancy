import jwt from 'jsonwebtoken';
import {catchAsyncError} from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'
import User from '../models/User.js';

//To check if user is authentictaed or not
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token', 401));
  }

  req.user = await User.findById(decoded.id).populate('tenant');

  if (!req.user) {
    return next(new ErrorHandler('User not found', 404));
  }

  next();
});

//To check if the user is authorized or not
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};