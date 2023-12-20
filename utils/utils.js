import Joi from "joi";

export const isAuth = (req,res,next)=>{
    if(req.session.isAuth){
        next()
    } else {
        res.send({ error: true, message: "please login!" });
    }
}

 const registerSchema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email:Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    confirmPassword: Joi.ref('password')
})
const feedbackSchema = Joi.object({
    title: Joi.string().min(3).max(10).required(),
    body: Joi.string().min(6).max(50).required(),
    imgURL: Joi.required()
})
const validator = (schema) => (payload) => schema.validate(payload, {abortEarly:false})
export const registerValidate = validator(registerSchema)
export const feedbackValidate = validator(feedbackSchema)