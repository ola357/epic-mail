import encrypter from 'object-encrypter';
import bcrypt from 'bcrypt';

import Validate from '../validators/Validates';
import { users, salt } from '../models/users';

const engine = encrypter('my secret');
/**
 * Class representing API endpoints for
 * the route for Auth controller
 * @param { object } request
 * @param { object } response
 * @returns { object } 
 */

class AuthControllers {
  static async userSignUp(req, res) {
    const { error } = Validate.userSignup(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const {
      email, firstName, lastName, password,
    } = req.body;

    let user = users.find(entry => entry.email === email);
    if (user) return res.status(400).send({ status: 400, error: "user already exists" });
    user = {
      id: users.length + 1,
      email,
      firstName,
      lastName,
      password: await bcrypt.hash(password, salt),
    };
    users.push(user);
    const token = engine.encrypt(user);

    res.send({ status: 200, data: [{ token }] });
  }

  static async userLogin(req, res) {
    const { error } = Validate.userLogin(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    const { email, password } = req.body;


    const user = users.find(entry => entry.email === email);
    if (!user) return res.status(400).send({ status: 400, error: "invalid email" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({ status: 400, error: "invalid password" });
    const token = engine.encrypt(user);

    res.send({ status: 200, data: [{ token }] });
  }
}

export default AuthControllers;
