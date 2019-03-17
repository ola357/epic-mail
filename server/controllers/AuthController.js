import encrypter from 'object-encrypter';
import bcrypt from 'bcrypt';

import Validate from '../validators/Validates';
import db from '../models/db';

const engine = encrypter('my secret');
/**
 * Class representing API endpoints for
 * the route for Auth controller
 * @param { object } request
 * @param { object } response
 * @returns { object } response
 */

class AuthControllers {
  static async userSignUp(req, res) {
    const { error } = Validate.userSignup(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const {
      email, firstname, lastname, password,
    } = req.body;

    let user = await db.query(
      'SELECT * FROM users WHERE email = ($1)', [email],
    );
    if (user.rowCount !== 0) return res.status(400).send({ status: 400, error: "user already exists" });

    const hashpassword = await bcrypt.hash(password, 10);
    user = await db.query(
      `INSERT INTO "users" ("firstname", "lastname", "email", "password")
      VALUES ('${firstname}','${lastname}', '${email}', '${hashpassword}') RETURNING *`,
    );
    // console.log(user);

    const token = engine.encrypt(user);
    await db.end();
    res.send({ status: 200, data: [{ token }] });
  }

  static async userLogin(req, res) {
    const { error } = Validate.userLogin(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const { email, password } = req.body;

    const user = await db.query(
      'SELECT * FROM users WHERE email = ($1)', [email],
    );
    console.log(user);
    if (user.rowCount !== 1) return res.status(400).send('Invalid email or password');


    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).send({ status: 400, error: "invalid email or password" });
    const token = engine.encrypt(user);

    res.send({ status: 200, data: [{ token }] });
  }
}

export default AuthControllers;
