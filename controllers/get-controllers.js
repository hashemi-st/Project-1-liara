import { Feedbacks } from "../model/feedbak.js";

class GetControllers {
  static async getFeedback(req, res) {
    const result = await Feedbacks.find({});
    res.status(200).send(result);
  }
  static async logout(req, res) {
    res.status(202).clearCookie("jwt").send("logout seccessfully");   
  }
}
export default GetControllers;
