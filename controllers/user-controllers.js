import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import UserService from "../services/userService.js";
import JwtService from "../services/JwtService.js";
import SmtpService from "../services/SmtpService.js";
import agendaService from '../services/agendaService.js';

class UserControllers {
  static async register(req) {
    if (await UserService.findOneByEmail(req.body.email)) {
      throw boom.conflict("this email is already registered!");
    }
    await UserService.create(req.body);
    return {
      message: "User registerd successfully!",
    };
  }

  static async login(req) {
    const user = await UserService.verifyUser(req.body);
    const accessToken = await JwtService.createAccessToken(user.id);
    return { accessToken };
  }

  static async forgotPassword(req) {
    const user = await UserService.findOneByEmail(req.body.email);
    if (!user) {
      throw boom.badRequest("this user did not register");
    }
    const link = JwtService.createResetPasswordLink(
      user.id,
      user.email,
      user.password,
      "15m"
    );
    console.log("link", link);
    agendaService("sendEmail", SmtpService.send(
            user.email,
            "Please confirm your email address",
            link
          ))
    return { message: `recovery password link sent to ${user.email}` };
  }

  static async resetPassword(req) {
    const { id, token } = req.params;
    let { password } = req.body;
    const user = await UserService.findByID(id);
    if (!user) {
      throw boom.badRequest("this user did not register");
    }
    try {
      if (JwtService.verifyResetPasswordLink(token, user.password)) {
        password = await bcrypt.hash(password, 12);
        await UserService.updateUserById(id, { password });
        return { message: "password changed successfully" };
      }
    } catch (error) {
      throw error;
    }
  }
}
export default UserControllers;
