
export const pageNotFound=async(req,res,next)=>{
   const error = new Error('page not found !!')
   error.status=404;
   console.log('error = ' ,error);
   next(error)
}
export const serverErrors=async(error,req,res,next)=>{
    res.status(error.status||500)
    .json({
        error:{
            message: error.message
        }
    })
}