export const errorMiddleware = (error, req, res, next) => {
    let statusCode = error.status || 500;    

    let parsedError = (error.message && error.message.startsWith('{')) ? JSON.parse(error.message) : { message: error.message || "An unknown error occurred" };
    console.log("Error - ", parsedError);
    

    res.status(statusCode).json({
        succes: false,
        error: parsedError
    })
};
