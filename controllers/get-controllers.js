import {Feedbacks} from '../model/feedbak.js'

class GetControllers {
    static async getFeedback(req, res){
      let result;
        try {
          result = await Feedbacks.find({});
        } catch (e) {
          res.status(400).send("Invalid data request!");
        }
        res.send(result);
      }
}
export default GetControllers;