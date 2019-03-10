import express from 'express';
import encrypter from 'object-encrypter';
import bcrypt from 'bcrypt';

import validate from '../validators/validate';
import { users, salt } from '../models/users';

const router = express.Router();
const engine = encrypter('my secret');


router.post('/signup', async (req, res) => {
  const { error } = validate.userSignup(req.body);
  if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

  let user = users.find(entry => entry.email === req.body.email);
  if (user) return res.status(400).send({ status: 400, error: "user already exists" });
  user = {
    id: users.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: await bcrypt.hash(req.body.password, salt),
  };
  users.push(user);
  const token = engine.encrypt(user);

  res.send({ status: 200, data: [{ token }] });
});

router.post('/login', async (req, res) => {
  const { error } = validate.userLogin(req.body);
  if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

  const user = users.find(entry => entry.email === req.body.email);
  if (!user) return res.status(400).send({ status: 400, error: "invalid email" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({ status: 400, error: "invalid password" });
  const token = engine.encrypt(user);

  res.send({ status: 200, data: [{ token }] });
});
export default router;
