import GetControllers from '../controllers/get-controllers.js';
import express from "express";
import tryCatch from '../utils/tryCatch.js';

const getRoutes = express.Router();


getRoutes.get("/api/v1/feedback", tryCatch(GetControllers.getFeedback))

export default getRoutes; 