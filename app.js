import express from "express";
import postRoutes from './routes/post-routes.js';
import getRoutes from './routes/get-routes.js';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';
import { logger } from "./middlewares/logger.js";
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser())
app.use(logger)
app.use(postRoutes)
app.use(getRoutes)
app.use(errorHandler)

app.listen("8000");