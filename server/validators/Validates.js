import Joi from 'joi';


class Validate {
  static userSignup(user) {
    const schema = {
      email: Joi.string().email().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
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

  static userReset(user) {
    const schema = {
      email: Joi.string().email().required(),
    };
    return Joi.validate(user, schema);
  }

  static createMessage(message) {
    const schema = {
      address: Joi.string().email().required(),
      subject: Joi.string().max(50).min(1).required(),
      message: Joi.string().max(300).min(1).required(),
      parentMessageId: Joi.number().integer(),
      status: Joi.string().lowercase().regex(/(draft|sent)/).required(),
    };
    return Joi.validate(message, schema);
  }
}
export default Validate;
