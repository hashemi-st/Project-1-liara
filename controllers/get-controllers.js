import {Feedbacks} from '../model/feedbak.js'
import AppError from "../utils/AppError.js";

class GetControllers {
    static async getFeedback(req, res){
        const result = await Feedbacks.find({});
        if(!result){
          throw new AppError(errorcode.DATABASE_DISCONNECTED, 'relation with database failed', 400)
        }
        res.status(200).send(result);
      }
}
export default GetControllers;