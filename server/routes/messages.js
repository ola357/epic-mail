import express from 'express';
import messagesController from '../controllers/messagesController';

const router = express.Router();


router.get('/', messagesController.getRecievedMessages);

router.get('/unread', messagesController.getUnreadMessages);

router.get('/sent', messagesController.getSentMessages);

router.get('/:id', messagesController.getSpecificMessage);

router.post('/', messagesController.createNewMessage);

router.delete('/:id', messagesController.deleteSpecificMessage);
export default router;
