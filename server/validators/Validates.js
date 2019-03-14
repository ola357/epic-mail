import Joi from 'joi';


class Validate {
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

  static createNewGroup(group) {
    const schema = {
      // eslint-disable-next-line newline-per-chained-call
      name: Joi.string().min(3).max(25).alphanum().required(),
      role: Joi.string().lowercase().regex(/(admin)/).required(),
    };
    return Joi.validate(group, schema);
  }

  static addedUser(user) {
    const schema = {
      userId: Joi.number().integer().required(),
      userRole: Joi.string().lowercase().regex(/(admin|member)/).required(),
    };
    return Joi.validate(user, schema);
  }

  static createGroupMessage(message) {
    const schema = {
      subject: Joi.string().max(50).min(1).required(),
      message: Joi.string().max(300).min(1).required(),
      status: Joi.string().lowercase().regex(/(unread|read)/).required(),
    };
    return Joi.validate(message, schema);
  }
}
export default Validate;
