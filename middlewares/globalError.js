const globalError = (err,req,res,next)=>{
    const status = err.statusCode || 500;

    res.status(status).json({
        succsess:false,
        error: err.message || "server error"
    })
}

export default globalError;