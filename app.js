import express from "express";
import postRoutes from './routes/post-routes.js';
import getRoutes from './routes/get-routes.js';
import session from "express-session";
import connectMongoDBSession from 'connect-mongodb-session';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config()
const app = express();

const MongoDBStore = connectMongoDBSession(session)

const store = new MongoDBStore({
    uri : process.env.URL_DATABASE,
    collection: 'mySessions'
    })

app.use(session({
    secret : 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store : store
})) 


// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(postRoutes)
app.use(getRoutes)
app.use(errorHandler)
app.listen("8000");
