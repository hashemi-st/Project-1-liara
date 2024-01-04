import Boom from "@hapi/boom";
import FeedbackService from "../services/FeedbackService.js";
import VoteService from "../services/VoteService.js";

class VoteControllers {
  static async addVote(req, res) {
    const { postId, vote } = req.body;

    const post = await FeedbackService.getFeedbackById(postId);
    if (!post.length) {
      throw Boom.badRequest("this post was not found ");
    }
    try {
      const userId = req.user.aud;
      const payload = {
        userId,
        postId,
        vote,
      };
      await VoteService.createvote(payload);
      return { message: "successfully voted" };
    } catch (e) {
      throw Boom.conflict("sorry, you already voted this post!");
    }
  }
}
export default VoteControllers;
