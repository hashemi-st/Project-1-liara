import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import boom from "@hapi/boom";


const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});
userSchema.pre("save", async function(next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
userSchema.statics.login = async function (payload) {
  const {email, password} = payload
  const user = await this.findOne({email}  );
  if (!user) {
    throw boom.badRequest("this email is not registered!");
  } else {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw boom.badRequest("password is wrong!");
  }
};
userSchema.methods.generateEmailVerificationKey = async function () {
  this.emailVerificationKey = uuid();
  await this.save();
  return this.emailVerificationKey;
};
const User = mongoose.model("User", userSchema);
export default User;
