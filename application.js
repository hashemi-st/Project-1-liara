import express from "express";
import JwtService from "./services/JwtService.js";
import errorHandler from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";
import cookieParser from "cookie-parser";
import config from "./config.js";
import { upload } from "./middlewares/upload.js";

class Application {
  app = express();
  constructor() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(logger);
    this.app.use("/images", express.static("images"));
  }

  route({ method, path, schema, controller, auth, uploadFile}) {
    const authMiddleware = auth ? JwtService.verifyAccessToken : [];
    const uploadMiddleware = uploadFile ? upload : [];
    
    this.app[method](path,authMiddleware,uploadMiddleware, async (req, res, next) => {
      try { 
        if (schema) {
          await schema.validateAsync(req.body,{ abortEarly: false });
        }
        return res.json(await controller(req));
      } catch (error) {
        return next(error);
      }
    });   
  }

  listen() {
    this.app.use(errorHandler);

    return new Promise((resolve) => {
      this.app.listen(config.PORT, () => {
        console.log(
          `The server is listening on http://localhost:${config.PORT}`
        );
        resolve(null);
      });
    });
  }
}

export default Application;
