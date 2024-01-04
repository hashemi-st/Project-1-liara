import mongoose, {Schema} from "mongoose";

const feedbackSchema = new Schema({
  userId: 'ObjectId',
  title: String,
  body: String,
  image: String
});

 const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;

   

