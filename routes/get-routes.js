import GetControllers from '../controllers/get-controllers.js';
import express from "express";

const getRoutes = express.Router();

getRoutes.get("/feedback", GetControllers.getFeedback)


export default getRoutes;