import express from 'express';
import GroupControllers from '../controllers/GroupsController';

const router = express.Router();

router.post('/signup', AuthControllers.userSignUp);

router.post('/login', AuthControllers.userLogin);

router.post('/reset', AuthControllers.userResetPassword);
export default router;
