const ErrorMiddleware = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Handle JWT errors
    if(err.name === 'JsonWebTokenError'){
        const message = "Invalid token, please login again",
        err = {statusCode: 401, message};
    }

    if(err.name === 'TokenExpiredError'){
        const message = "Token expired, pleasde login again",
        err = {statusCode: 401, message};
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

export default ErrorMiddleware;