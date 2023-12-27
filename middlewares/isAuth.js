import jwt from "jsonwebtoken";
 
export const isAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).send({ error: true, message: "please login!" });
        } else {
          req.user = decodedToken
          next();
        }
      });
    } else {

        res.status(401).send({ error: true, message: "please login!" });
    }
  };