import express from 'express';
import authControllers from '../controllers/authControllers';

const router = express.Router();

router.post('/signup', authControllers.userSignUp);

router.post('/login', authControllers.userLogin);
export default router;
