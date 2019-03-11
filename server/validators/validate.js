import Joi from 'joi';


class validate {
  static userSignup(user) {
    const schema = {
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().alphanum().required(),
    };
    return Joi.validate(user, schema);
  }

  static userLogin(user) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().required(),
    };
    return Joi.validate(user, schema);
  }

  static createMessage(message) {
    const schema = {
      subject: Joi.string().max(50).min(1).required(),
      message: Joi.string().max(300).min(1).required(),
      status: Joi.string().lowercase().regex(/(draft|sent)/).required(),
    };
    return Joi.validate(message, schema);
  }
}
export default validate;
