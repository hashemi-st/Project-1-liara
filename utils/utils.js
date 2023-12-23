import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email:Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    confirmPassword: Joi.ref('password')
})
const feedbackSchema = Joi.object({
    title: Joi.string().min(3).max(10).required(),
    body: Joi.string().min(6).max(50).required(),
})
const validator = (schema) => (payload) => schema.validate(payload, {abortEarly:false})
export const registerValidate = validator(registerSchema)
export const feedbackValidate = validator(feedbackSchema)