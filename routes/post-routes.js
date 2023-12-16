import PostControllers from '../controllers/post-controllers.js';
import express from "express";

const postRoutes = express.Router();

postRoutes.post("/add-feedback", PostControllers.addFeedback)
postRoutes.post("/add-points", PostControllers.addPoints)
postRoutes.post("/register", PostControllers.register)
postRoutes.post("/login", PostControllers.login)


export default postRoutes;