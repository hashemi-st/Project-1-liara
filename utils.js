export const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    } else {
        res.send({ error: true, message: "please login!" });
    }
}