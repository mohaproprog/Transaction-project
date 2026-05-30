const notFound = (req,res,next)=>{

    const error = new Error(`not found ${req.originalUrl}`);
    error.statusCode = 404;
    next(error)

}

export default notFound