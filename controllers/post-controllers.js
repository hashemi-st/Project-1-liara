import { Feedbacks, Users, Votes } from "../model/feedbak.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt";
import { errorcode } from "../utils/errorCodes.js";
import {
  registerValidate,
  feedbackValidate,
  createToken,
  maxAge,
} from "../utils/utils.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

class PostControllers {
  static async addFeedback(req, res) {
    const { error, value } = feedbackValidate(req.body);
    if (error) throw error;

    const myObject = new Feedbacks({
      title: value.title,
      body: value.body,
    });

    await myObject.save();
    res.status(200).send("feedback was added successfully");
  }

  static async addVote(req, res) {
    const { postId, userId, vote } = req.body;
    if (!postId || !userId || !vote) {
      throw new AppError(errorcode.INVALID_REQUEST, "bad data request", 400);
    }
    const existingVote = await Votes.findOne({ userId, postId });

    if (existingVote) {
      return res.send("sorry you already voted to this featcher");
    } else {
      const myObject = new Votes({
        userId,
        postId,
        vote,
      });
      await myObject.save();
      res.status(200).send("successfully voted");
    }
  }

  static async register(req, res) {
    const { error, value } = registerValidate(req.body);
    if (error) throw error;

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

    const user = await Users.login(email, password);

    // const user = await Users.findOne({ email });
    // if (!user) {
    //   throw new AppError(300, "email is wrong!", 400);
    // } else {
    //   const isMatched = await bcrypt.compare(password, user.password);
    //   if (!isMatched) {
    //     throw new AppError(300, "password is wrong!", 400);
    //   }
    // }

    // req.session.isAuth = true;

    const token = createToken(user._id, user.email);
    res.cookie("jwt", token, { httpOnly: true, maxAge });

    const { _id, username } = user;
    // logger.info('aaa')
    res.status(200).json({ _id, username, email });
  }

  static async upload(req, res) {
    Feedbacks.updateOne(
      { _id: req.body.id },
      {
        $push: {
          image: {
            name: req.file.originalname,
            info: {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            },
          },
        },
      }
    )
      .then(() => res.send("Image was uploaded successfully"))
      .catch((err) => console.log(err));
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      res.send("user there is not exists");
    }
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:8000/reset-password/${user.id}/${token}`;

    // const smtpConfig = {
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 587,
    //   auth: {
    //     user: "dbf94d0a5fb126",
    //     pass: "2cae8d4b7e8fc5",
    //   },
    // };


    const smtpConfig = {
      host: "smtp.c1.liara.email",
      port: 587,
      auth: {
        user: "gifted_haslett_sqpnnv",
        pass: "06268bfe-1cf6-4881-afb5-43e05a1de408",
      },
    };

    const transporter = nodemailer.createTransport(smtpConfig);
    const mailOptions = {
      from: "info@picktopic.ir",
      to: "hashemi.st@gmail.com",
      subject: "Reset your password",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error)
      } else {
        res.json("link reset-password sent to your email");
      }
    });
  }

  static async resetPassword(req, res) {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json("something is wrong with token");
      } else {
        bcrypt
          .hash(password, 12)
          .then((hash) => {
            Users.findByIdAndUpdate({ _id: id }, { password: hash })
              .then((u) => res.send("password changed successfully"))
              .catch((err) => res.send({ status: err }));
          })
          .catch((err) => res.send({ status: err }));
      }
    });
  }
}
export default PostControllers;
