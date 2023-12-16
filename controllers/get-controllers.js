import {modelFeedback} from '../model/feedbak.js'

class GetControllers {
    static async getFeedback(req, res){
      let result;
      console.log(req.session)
      req.session.isAuth = true
      console.log('id',req.session.id)
        try {
          result = await modelFeedback.find({});
        } catch (e) {
          res.status(400).send("Invalid data request!");
        }
        res.send(result);
      }
}
export default GetControllers;