const { Joi } = require("express-validation");

const loginValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .rule({ message: "Please Enter a valid Email" })
      .required(),
    password: Joi.string().required()
  })
};

const registerValidation = {
  body: Joi.object({
    userName: Joi.string()
      .regex(/^[A-Za-z ]*$/)
      .rule({ message: "Name should contain only alphabets" })
      .required(),

    email: Joi.string()
      .email()
      .rule({ message: "Please Enter a valid Email" })
      .required(),

    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/)
      .rule({
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase and one number"
      })
      .required()
  })
};

module.exports = {
  loginValidation,
  registerValidation
};
