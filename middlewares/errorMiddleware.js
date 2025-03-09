export const errorMiddleware = (error, req, res, next) => {
    let statusCode = error.status || 500;

    let parsedError = (typeof error.message === 'string') ? JSON.parse(error.message) : { message: "An unknown error occurred" };
    console.log("Error - ", parsedError);
    

    res.status(statusCode).json({
        succes: false,
        error: parsedError
    })
};
