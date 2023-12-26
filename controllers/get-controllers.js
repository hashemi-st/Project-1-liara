import {Feedbacks} from '../model/feedbak.js'
import boom from '@hapi/boom'

class GetControllers {
    static async getFeedback(req, res){
        const result = await Feedbacks.find({});
        if(!result || result.length === 0){
          throw boom.notFound('Error with receive data!')        }
        res.status(200).send(result);
      }
      static async logout(req, res) {
        res.cookie("jwt", '', {maxAge:1}).send("logout seccessfully");
      }
}
export default GetControllers;