import mongoose from "mongoose";

// connect to database
mongoose
  .connect(
    "mongodb://root:E3BvZsLQl3dauNVqOohDm0x5@k2.liara.cloud:34395/my-app?authSource=admin"
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

export const modelFeedback = mongoose.model("modelFeedback", schemaFeedback);

