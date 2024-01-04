import User from "../model/user.js";

class UserService {
  static findByID(id) {
    return User.findOne({_id:id});
  }

  static findOneByEmail(email) {
    return User.findOne({ email });
  }

  static async create(payload) {
    try {
      const user = new User(payload);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  static async updateUserById(id, payload) {
    try {
      await User.findByIdAndUpdate({ _id: id },  payload );
    } catch (error) {
      throw error;
    }
  }

  static async verifyUser(payload) {
    try {
     return await User.login(payload);
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
