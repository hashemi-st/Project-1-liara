import express from "express";
import postRoutes from './routes/post-routes.js';
import getRoutes from './routes/get-routes.js';
import {modelFeedback} from './model/feedbak.js'

const app = express();

// try{

//     await modelFeedback.deleteMany({});
//     console.log('pak shod')

// }catch(e){
// console.error(e)
// }

// for define request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(postRoutes)
app.use(getRoutes)

app.listen("8000");
