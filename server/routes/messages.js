import express from 'express';
import MessagesController from '../controllers/messagesController';

const router = express.Router();


router.get('/', MessagesController.getRecievedMessages);

router.get('/unread', MessagesController.getUnreadMessages);

router.get('/sent', MessagesController.getSentMessages);

router.get('/:id', MessagesController.getSpecificMessage);

router.post('/', MessagesController.createNewMessage);

router.delete('/:id', MessagesController.deleteSpecificMessage);
export default router;
