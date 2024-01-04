import FeedbackService from "../services/FeedbackService.js";
import boom from "@hapi/boom";

class FeedbackControllers {
  static async getFeedback() {
    const result = await FeedbackService.getAllFeedbacks();
    return {result};
  }

  static async addFeedback(req) {
    const payload = {
      userId: req.user.aud,
      title: req.body.title,   
      body: req.body.body,
    };
    await FeedbackService.createFeedback(payload)
    return {message: "feedback was added successfully"};
  }

  static async upload(req) {
    const id = req.body.postId;
    const post = await FeedbackService.getFeedbackById( id );
    if (!post.length) {
      throw boom.badRequest("this post was not found!");
    }
    if (req.file ) {
      await FeedbackService.updateFeedbackById(
       id , {image: req.file.path} )
        return {message: "Image was uploaded successfully"};
    }
  }   
}
export default FeedbackControllers;
