import { Feedbacks, Users } from "../model/feedbak.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { errorcode } from "../utils/errorCodes.js";
import { registerValidate, feedbackValidate } from "../utils/utils.js";


class PostControllers {
  static async addFeedback(req, res) {
    const { error, value } = feedbackValidate(req.body);
    if (error) throw error

    const myObject = new Feedbacks({
      title: value.title,
      body: value.body
    });

    await myObject.save();
    res.status(200).send("feedback was added successfully");
  }

  static async addVote(req, res) {
    const { postId, userId, vote } = req.body;
    if (!postId || !userId || !vote) {
      throw new AppError(errorcode.INVALID_REQUEST, "bad data request", 400);
    }
    const user = await Users.findById(userId)
    const feedback = await Feedbacks.findById(postId)
    const username = feedback.votes.map(vote=> vote.user === user.username)
    if(!user){
      return res.send('user not found')
    } else if( username.length){
      return res.send('sorry you already voted to this featcher')
    } else {
          await Feedbacks.updateOne({_id:postId}, 
          {$push:{"votes": {
            user: user.username,
            vote: vote
           }
         }});
         lo
        res.status(200).send("successfully voted");
    }
  }

  static async register(req, res) {
    const { error, value } = registerValidate(req.body);
    if (error) throw error

    const { username, email, password } = value;

    let user = await Users.findOne({ email });
    if (user) {
      throw new AppError(
        errorcode.INVALID_SUBSCRIPTION,
        "this email is already there!",
        400
      );
    }
    const hashed = await bcrypt.hash(password, 12);
    user = new Users({
      username,
      email,
      password: hashed,
    });
    await user.save();
    res.status(200).send("user was registered!");
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      throw new AppError(300, "email is wrong!", 400);
    } else {
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        throw new AppError(300, "password is wrong!", 400);
      }
    }
    req.session.isAuth = true;

    const { _id, username } = user;
    // logger.info('aaa')
    res.status(200).json({ _id, username, email });
  }

  static async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      res.send("logout seccessfully");
    });
  }

  static async upload(req, res) {
        Feedbacks.updateOne(
          {_id:req.body.id},
          {$push:{"image":        {
            name: req.file.originalname,
            info: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
      }}}) 
        .then(() => res.send('Image was uploaded successfully'))
          .catch(err => console.log(err))
  }
}
export default PostControllers;
