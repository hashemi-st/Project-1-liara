import {modelFeedback} from '../model/feedbak.js'

class PostControllers {
    static async addFeedback(req, res){
        const myObject = new modelFeedback({
          title: req.body.title,
          body: req.body.body,
          imgURL: req.body.imgURL,
        });
        let result;  
        try {
          await myObject.save();
          result = await modelFeedback.find({});
        } catch (e) {
          res.status(400).send("Invalid data request!");
        }
        res.send(result);
      }

      static async addPoints(req, res){
        let result;
        try {   
          result = await modelFeedback.findByIdAndUpdate(req.body.id, {points : req.body.points}); 
          await result.save();

        } catch (e) {
          res.status(400).send("Invalid data request!");
        }
        res.send(result);
      }
}
export default PostControllers;