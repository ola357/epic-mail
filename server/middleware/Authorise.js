import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Authorise {
  static protect(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).send({
        status: 401,
        error: "Access denied, No token",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send({
        status: 400,
        error: "invalid token",
      });
    }
  }
}

export default Authorise;
