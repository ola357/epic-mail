import express from 'express';
import MessagesController from '../controllers/MessageController';
import Authorise from '../middleware/Authorise';

const router = express.Router();


router.get('/', MessagesController.getRecievedMessages);

router.get('/unread', MessagesController.getUnreadMessages);

router.get('/sent', MessagesController.getSentMessages);

router.get('/:id', MessagesController.getSpecificMessage);

router.post('/', Authorise.protect, MessagesController.createNewMessage);

router.delete('/:id', MessagesController.deleteSpecificMessage);
export default router;
