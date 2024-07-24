export const pageNotFound = (req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
};

export const serverErrors = (error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
};
