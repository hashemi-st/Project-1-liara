import Feedback from "../model/feedbak.js";

class FeedbackService {
  static async getAllFeedbacks() {
    return await Feedback.find({});
  }
  static async getFeedbackById(id) {
    return await Feedback.find({ _id: id });
  }

  static async createFeedback(payload) {
    try {
      const feedback = new Feedback(payload);
      return await feedback.save();
    } catch (error) {
      throw error;
    }
  }

  static async updateFeedbackById(id, payload) {
    try {
      await Feedback.findByIdAndUpdate({ _id: id },  payload );
    } catch (error) {
      throw error;
    }
  }
}

export default FeedbackService;
