import encrypter from 'object-encrypter';
import bcrypt from 'bcrypt';
import Validate from '../validators/Validates';
import connectionPool from '../models/connectionPool';
import salt from '../models/salt';

const engine = encrypter('my secret');
/**
 * Class representing API endpoints for
 * the route for Auth controller
 * @param { object } request
 * @param { object } response
 * @returns { object }
 */

class AuthControllers {
  // POST auth/signup
  static async userSignUp(req, res) {
    const { error } = Validate.userSignup(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const {
      firstname, lastname, email, password,
    } = req.body;

    let result = await connectionPool.query('SELECT * FROM users WHERE email = ($1)', [email]);
    if (result.rowCount !== 0) return res.status(400).send({ status: 400, error: "user already exists" });

    const pwd = password;
    await bcrypt.hash(password, salt);

    result = await connectionPool.query('INSERT INTO users(firstname, lastname, email, password)'
                               + 'VALUES($1,$2,$3, $4) RETURNING *',
    [firstname, lastname, email, pwd]);
    console.log(result);
    const token = engine.encrypt(result);
    await connectionPool.end();


    res.send({ status: 200, data: [{ token }] });
  }

  // POST auth/login
  static async userLogin(req, res) {
    const { error } = Validate.userLogin(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    const { email, password } = req.body;

    const result = await connectionPool.query(
      'SELECT * FROM users WHERE email = ($1)', [email],
    );
    console.log(result);
    if (result.rowCount !== 1) return res.status(400).send({ status: 400, error: "invalid email" });


    const validPassword = await bcrypt.compare(password, result.rows[0].password);
    if (!validPassword) return res.status(400).send({ status: 400, error: "invalid password" });
    const token = engine.encrypt(result);

    res.send({ status: 200, data: [{ token }] });
  }
}

export default AuthControllers;
