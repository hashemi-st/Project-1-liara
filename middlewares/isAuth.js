// export const isAuth = (req,res,next)=>{
//     if(req.session.isAuth){
//         next()
//     } else {
//         res.send({ error: true, message: "please login!" });
//     }
// }

export const isAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.send({ error: true, message: "please login!" });
        } else {
          next();
        }
      });
    } else {
        res.send({ error: true, message: "please login!" });
    }
  };