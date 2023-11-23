import Joi from "joi";

export const validateProduct = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().integer().min(0).required().strict(),
  desc: Joi.string().min(10),
});
