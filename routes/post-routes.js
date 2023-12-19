import PostControllers from '../controllers/post-controllers.js';
import express from "express";
import { isAuth } from '../utils.js';

const postRoutes = express.Router();

postRoutes.post("/add-feedback", isAuth, PostControllers.addFeedback)
postRoutes.post("/add-points", isAuth, PostControllers.addPoints)
postRoutes.post("/register", PostControllers.register)
postRoutes.post("/login", PostControllers.login)
postRoutes.post("/logout", PostControllers.logout)



export default postRoutes;