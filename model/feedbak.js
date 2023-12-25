import mongoose from "mongoose";
import dotenv from 'dotenv'
import bcrypt from "bcrypt";

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


const feedbackSchema = new Schema({
  title: String,
  body: String,
  image: [{
    name: String,
    info: {
        data: Buffer,
        contentType: String
    }
  }]
});


const votesSchema = new Schema({
    userId : String,
    postId : String,
    vote: String
})

const userSchema = new Schema({
  username: String,
  email:String,
  password: String
});
userSchema.statics.login = async function(email,password){
  const user = await this.findOne({email})
  if(user){
      const auth = await bcrypt.compare(password, user.password)
      if(auth){
          return user
      }
      throw Error("password is incorrect!")
  }
  throw Error("email is incorrect!")
}




export const Feedbacks = mongoose.model("Feedbacks", feedbackSchema);
export const Users = mongoose.model("Users", userSchema);
export const Votes = mongoose.model("Votes", votesSchema);


