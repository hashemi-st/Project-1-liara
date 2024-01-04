import jwt from "jsonwebtoken";
import boom from "@hapi/boom";
import config from "../config.js";

class JwtService {

  static verifyAccessToken = (req, res, next) => {
    if (!req.headers["authorization"]) throw boom.unauthorized("please login!");
    const authHeader = req.headers["authorization"].split(" ");
    const token = authHeader[1];
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        throw boom.unauthorized("please login!");
      } else {
        req.user = decodedToken;
        next();
      }
    });
  };


  static createAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = config.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "nnn.com",
        audience: userId,
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  };

  static createRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = config.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "nnn.com",
        audience: userId,
      };


      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);

        // save in redis instead of send to client directly

        // client.SET(userId, token, 'EX', 365*24*60*60, (err, reply) => {
        //   if (err) {
        //     console.log(err);
        //     throw new Error();
        //   }
        //   resolve(token);
        // });

        resolve(token);
      });
    });
  };

  static verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decodedToken) => {
        if (err) throw boom.unauthorized("please login!");
        const userId = decodedToken.aud;
        // get refreshToken from redis database

        // client.GET(userId, (err, result) => {
        //   if (err) {
        //     console.log(err);
        //     throw new Error();
        //   }
        //   if (token === result) {
        //     return resolve(userId);
        //   }
        //   throw boom.unauthorized("unauthorized");
        // });

        resolve(userId);
      });
    });
  };

  static createResetPasswordLink = (id, email, password, expiresIn) => {
    const secret = config.JWT_SECRET + password;
    const token = jwt.sign({id, email}, secret, {expiresIn})

    return `http://localhost:8000/api/v1/reset-password/${id}/${token}`;
  };

  static verifyResetPasswordLink = (token, password) => {
    const secret = config.JWT_SECRET + password;
    return jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        return {
          message: "sorry,something is wrong with token",
        };
      } else {
        return true;
      }
    });
  };
}
export default JwtService;
