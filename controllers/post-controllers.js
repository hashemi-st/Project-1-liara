import { Feedbacks, Users } from "../model/feedbak.js";
import bcrypt from "bcrypt";

class PostControllers {
  static async addFeedback(req, res) {
    const myObject = new Feedbacks({
      title: req.body.title,
      body: req.body.body,
      imgURL: req.body.imgURL,
    });
    let result;
    try {
      await myObject.save();
      result = await Feedbacks.find({});
    } catch (e) {
      res.status(400).send("Invalid data request!");
    }
    res.send(result);
  }

  static async addPoints(req, res) {
    let result;
    try {
      result = await Feedbacks.findByIdAndUpdate(req.body.id, {
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

    let user = await Users.findOne({ email });
    if (user) {
      res.send({ error: true, message: "this email is already there!" });
    }
    const hashed = await bcrypt.hash(password, 12);
    user = new Users({
      username,
      email,
      password: hashed,
    });
    await user.save();
    res.send("user was registered!");
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try{
        const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({ error: true, message: "email is wrong!" })
    } else {
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        res.status(400).json({ error: true, message: "password is wrong!" })
      }
    }
    req.session.isAuth = true

    const {_id, username} = user
    res.status(200).json({_id, username, email});
    }catch (e) {
    console.log(e)
  }
  }

  static async logout(req, res){
  req.session.destroy(err=>{
  if(err){
    throw err
  }
  res.send("logout seccessfully")
})
  }
}
export default PostControllers;
