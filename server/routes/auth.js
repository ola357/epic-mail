import express from 'express';
import AuthControllers from '../controllers/AuthController';

const router = express.Router();

router.post('/signup', AuthControllers.userSignUp);

router.post('/login', AuthControllers.userLogin);

router.post('/reset', AuthControllers.userResetPassword);
export default router;
