import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
// connect to database
mongoose
  .connect(
    process.env.URL_DATABASE
  )
  .then(() => {
    console.log("Connected!");
  })
  .catch((error) => {
    console.error("Failed to connect!", error);
  });

const Schema = mongoose.Schema;

const schemaFeedback = new Schema({
  title: String,
  body: String,
  imgURL: String,
  points: Number
});


const schemaUser = new Schema({
  username: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required : true,
    // unique : true
  },
  password: {
    type: String,
    required : true
  },
});



export const modelFeedback = mongoose.model("modelFeedback", schemaFeedback);
export const modelUser = mongoose.model("modelUser", schemaUser);


