import Joi from "joi";
import jwt from "jsonwebtoken";

// Validate data user for register
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required(),
  confirmPassword: Joi.ref("password"),
});

// Validate data user for posts
const feedbackSchema = Joi.object({
  title: Joi.string().min(3).max(10).required(),
  body: Joi.string().min(6).max(50).required(),
});

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

export const registerValidate = validator(registerSchema);
export const feedbackValidate = validator(feedbackSchema);

// generate Token for authentication
export const maxAge = 3 * 24 * 60 * 60;

export const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
