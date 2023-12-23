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
postRoutes.post("/api/v1/logout", tryCatch(PostControllers.logout))
postRoutes.post("/api/v1/upload-image", isAuth, upload, tryCatch(PostControllers.upload))


export default postRoutes; 