import PostControllers from '../controllers/post-controllers.js';
import express from "express";
import { isAuth } from '../utils/utils.js';
import tryCatch from '../utils/tryCatch.js';

const postRoutes = express.Router();


postRoutes.post("/api/v1/add-feedback", isAuth, tryCatch(PostControllers.addFeedback))
postRoutes.post("/api/v1/add-points", isAuth, tryCatch(PostControllers.addPoints))
postRoutes.post("/api/v1/register", tryCatch(PostControllers.register))
postRoutes.post("/api/v1/login", tryCatch(PostControllers.login))
postRoutes.post("/api/v1/logout", PostControllers.logout)



export default postRoutes;