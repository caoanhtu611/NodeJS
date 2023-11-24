import Joi from "joi";

export const signUpValid = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: Joi.ref("password"),
  confirmpass: Joi.string().required().valid(Joi.ref("password")),
  address: Joi.string().min(20),
  phonenumber: Joi.string(),
});

export const singInValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(255),
});
