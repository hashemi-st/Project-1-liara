import { modelFeedback, modelUser} from "../model/feedbak.js";
import  bcrypt  from 'bcrypt';

class PostControllers {
  static async addFeedback(req, res) {
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

  static async addPoints(req, res) {
    let result;
    try {
      result = await modelFeedback.findByIdAndUpdate(req.body.id, {
        points: req.body.points,
      });
      await result.save();
    } catch (e) {
      res.status(400).send("Invalid data request!");
    }
    res.send(result);
  }

  static async register(req, res) {
    const { username, email, password } = req.body;

    let user = await modelUser.findOne({email})
    if(user){
      
      res.send({error: true , message: 'this email is already there!'}) 
    }
    const hashed = await bcrypt.hash(password, 12)
    user = new modelUser({
      username,
      email,
      password : hashed
    })
    await user.save()
    res.send('user was registered!')
  }

  static async login(req, res) {}
}
export default PostControllers;
