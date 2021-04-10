const Joi = require("joi");

function ValidateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    url: Joi.string().required().uri(),
    price: Joi.string().required()
  });
  return schema.validate(product);
}

module.exports = ValidateProduct;
