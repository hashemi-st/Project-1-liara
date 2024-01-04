import Joi from "joi";

class ValidateService {
 static registerSchema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    confirmPassword: Joi.ref("password"),
  });

  static feedbackSchema = Joi.object({
  title: Joi.string().min(3).max(10).required(),
  body: Joi.string().min(6).max(50).required(),
});

static voteSchema = Joi.object({
  postId: Joi.string().required(),
  userId: Joi.string().required(),
  vote: Joi.string().required(),
});

}

export default ValidateService;   
