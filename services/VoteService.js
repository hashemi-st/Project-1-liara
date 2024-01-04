import Vote from "../model/vote.js";

class VoteService {
    static async createvote(payload) {
        try {
          const vote = new Vote(payload);
          return await vote.save();
        } catch (error) {
          throw error;
        }
      }
}

export default VoteService;