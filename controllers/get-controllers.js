import {Feedbacks} from '../model/feedbak.js'
import AppError from "../utils/AppError.js";
// import { maxAge } from "../utils/utils.js";

class GetControllers {
    static async getFeedback(req, res){
        const result = await Feedbacks.find({});
        if(!result){
          throw new AppError(errorcode.DATABASE_DISCONNECTED, 'relation with database failed', 400)
        }
        res.status(200).send(result);
      }
      static async logout(req, res) {
        res.cookie("jwt", '', {maxAge:1}).send("logout seccessfully");

        // req.session.destroy((err) => {
        //   if (err) {
        //     throw err;
        //   }
        //   res.send("logout seccessfully");
        // });
      }
}
export default GetControllers;