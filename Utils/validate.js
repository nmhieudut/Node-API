const Joi = require("joi");

function ValidateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(product);
}

module.exports = ValidateProduct;
