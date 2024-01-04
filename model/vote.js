import mongoose, {Types, Schema} from "mongoose";


const votesSchema = new Schema({
  userId: Types.ObjectId,
  postId: Types.ObjectId,
  vote: String,
});
votesSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Vote = mongoose.model("Vote", votesSchema);
export default Vote;
