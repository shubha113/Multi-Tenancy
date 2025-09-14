import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Tenant from "../models/Tenant.js";
import ErrorHandler from "../utils/errorHandler.js";

//Upgrade tenant subscription
export const upgradeTenant = catchAsyncError(async (req, res, next) => {
  const { slug } = req.params;

  // Check if user is admin of the tenant
  if (req.user.role !== "admin" || req.user.tenant.slug !== slug) {
    return next(
      new ErrorHandler("Only tenant admin can upgrade subscription", 403)
    );
  }

  const tenant = await Tenant.findOne({ slug });

  if (!tenant) {
    return next(new ErrorHandler("Tenant not found", 404));
  }

  if (tenant.subscription === "pro") {
    return next(new ErrorHandler("Tenant is already on Pro plan", 400));
  }

  tenant.subscription = "pro";
  tenant.maxNotes = -1;
  await tenant.save();

  res.status(200).json({
    success: true,
    message: "Subscription upgraded to Pro successfully",
    tenant,
  });
});
