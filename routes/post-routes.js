import PostControllers from '../controllers/post-controllers.js';
import express from "express";

const postRoutes = express.Router();

postRoutes.post("/add-feedback", PostControllers.addFeedback)
postRoutes.post("/add-points", PostControllers.addPoints)


export default postRoutes;