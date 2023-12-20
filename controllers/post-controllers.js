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
      body: value.body,
      imgURL: value.imgURL,
    });

    await myObject.save();
    const result = await Feedbacks.find({});

    res.status(200).send(result);
  }

  static async addPoints(req, res) {
    const { id, points } = req.body;
    if (!id || !points) {
      throw new AppError(errorcode.INVALID_REQUEST, "bad data request", 400);
    }

    const result = await Feedbacks.findByIdAndUpdate(req.body.id, {
      points: req.body.points,
    });
    await result.save();

    res.status(200).send("successfully voted");
  }

  static async register(req, res) {
    const { error, value } = registerValidate(req.body);
    if (error) throw error

    const { username, email, password } = value;

    let user = await Users.findOne({ email });
    if (user) {
      // res.send({ error: true, message: "this email is already there!" });
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
        throw new AppError(301, "password is wrong!", 400);
      }
    }
    req.session.isAuth = true;

    const { _id, username } = user;
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
}
export default PostControllers;
