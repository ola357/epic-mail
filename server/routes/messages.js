import express from 'express';
import MessagesController from '../controllers/MessageController';
import Authorise from '../middleware/Authorise';

const router = express.Router();


router.get('/', Authorise.protect, MessagesController.getRecievedMessages);

router.get('/unread', Authorise.protect, MessagesController.getUnreadMessages);

router.get('/sent', Authorise.protect, MessagesController.getSentMessages);

router.get('/:id', Authorise.protect, MessagesController.getSpecificMessage);

router.post('/', Authorise.protect, MessagesController.createNewMessage);

router.delete('/:id', Authorise.protect, MessagesController.deleteSpecificMessage);
export default router;
