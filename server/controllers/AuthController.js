import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Validate from '../validators/Validates';
import db from '../models/db';

dotenv.config();

/**
 * Class representing API endpoints for
 * the route for Auth controller
 * @param { object } request
 * @param { object } response
 * @returns { object } response
 */

class AuthControllers {
  /**
 *
 * POST /auth/signup
 * Route for signing up new users
 */
  static async userSignUp(req, res) {
    const { error } = Validate.userSignup(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const {
      username, firstname, lastname, password,
    } = req.body;
    const email = username;
    let user = await db.query(
      'SELECT * FROM users WHERE email = ($1)', [email],
    );
    if (user.rowCount !== 0) return res.status(409).send({ status: 409, error: "user already exists" });

    const hashpassword = await bcrypt.hash(password, 10);
    user = await db.query(
      `INSERT INTO "users" ("firstname", "lastname", "email", "password")
      VALUES ('${firstname}','${lastname}', '${email}', '${hashpassword}') RETURNING *`,
    );
    // console.log(user);

    const token = jwt.sign({
      _id: user.rows[0].id,
      _email: user.rows[0].email,
    }, process.env.jwtPrivateKey);

    // await db.end();
    res.header('x-auth-token', token).send({ status: 200, data: [{ token }] });
  }

  /**
 *
 * POST /auth/login
 * Route for login users
 */
  static async userLogin(req, res) {
    const { error } = Validate.userLogin(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const { email, password } = req.body;

    const user = await db.query(
      'SELECT * FROM users WHERE email = ($1)', [email],
    );
    // console.log(user);
    if (user.rowCount !== 1) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).send({ status: 400, error: "invalid email or password" });

    const token = jwt.sign({
      _id: user.rows[0].id,
      _email: user.rows[0].email,
    }, process.env.jwtPrivateKey);

    // await db.end();
    res.send({ status: 200, data: [{ token }] });
  }

  static async userResetPassword(req, res) {
    const { error } = Validate.userReset(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
  }
}

export default AuthControllers;
