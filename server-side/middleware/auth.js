const jwt=require("jsonwebtoken");
exports.auth=(req,res,next)=>{
    try
    {
       const {authorization}=req.headers;
       if (!authorization) {
        return next({ message: "Authorization header is missing", status: 401 });
      }
       const [,token]=authorization.split(' ');
       if (!token) {
        return next({ message: "Token is missing", status: 401 });
      }  
       const privateKey=process.env.JWT_SECRET ||'JWT_SECRET';
       const data=jwt.verify(token,privateKey);
       req.user=data;
       next();
    }catch(err)
    {
        next({message:'Not authorized',status:401})
    }
}