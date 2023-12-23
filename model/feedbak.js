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
  image: [{
    name: String,
    info: {
        data: Buffer,
        contentType: String
    }
  }],
  votes: [{
    user : String,
    vote: String
  }]
});


const schemaUser = new Schema({
  username: String,
  email:String,
  password: String
});

export const Feedbacks = mongoose.model("Feedbacks", schemaFeedback);
export const Users = mongoose.model("Users", schemaUser);


