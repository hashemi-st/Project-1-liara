import PostControllers from '../controllers/post-controllers.js';
import express from "express";
import { upload } from '../middlewares/upload.js';
import { isAuth } from '../middlewares/isAuth.js';
import tryCatch from '../utils/tryCatch.js';

const postRoutes = express.Router();

postRoutes.post("/api/v1/add-feedback", isAuth, tryCatch(PostControllers.addFeedback))
postRoutes.post("/api/v1/add-vote", isAuth, tryCatch(PostControllers.addVote))
postRoutes.post("/api/v1/register", tryCatch(PostControllers.register))
postRoutes.post("/api/v1/login", tryCatch(PostControllers.login))
postRoutes.post("/api/v1/upload-image", isAuth, upload, tryCatch(PostControllers.upload))
postRoutes.post("/api/v1/forgot-password", tryCatch(PostControllers.forgotPassword))
postRoutes.post("/api/v1/reset-password/:id/:token", tryCatch(PostControllers.resetPassword))


export default postRoutes; 