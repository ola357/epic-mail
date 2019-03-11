import express from 'express';
import messagesController from '../controllers/messagesController';

const router = express.Router();
const {
  getRecievedMessages,
  getUnreadMessages,
  getSentMessages,
  getSpecificMessage,
  createNewMessage,
  deleteSpecificMessage,
} = messagesController;

router.get('/', getRecievedMessages);

router.get('/unread', getUnreadMessages);

router.get('/sent', getSentMessages);

router.get('/:id', getSpecificMessage);

router.post('/', createNewMessage);

router.delete('/:id', deleteSpecificMessage);
export default router;
