import Tenant from "../models/Tenant.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const validateTenant = catchAsyncError(async (req, res, next) => {
    const { slug } = req.params;
    
    if (slug) {
        const tenant = await Tenant.findOne({ slug });
        if (!tenant) {
            return next(new ErrorHandler('Tenant not found', 404));
        }
        req.tenant = tenant;
    }
    
    next();
});

export const checkTenantAccess = (req, res, next) => {
    if (req.user && req.tenant) {
        if (req.user.tenant._id.toString() !== req.tenant._id.toString()) {
            return next(new ErrorHandler('Access denied to this tenant', 403));
        }
    }
    next();
};