import express from 'express';

const router = express.Router();
const messages = [
  {
    id: 1, createdOn: Date.now, subject: 'Hello Friend', parentMessageId: 1, status: 'read',
  },
];

router.get('/', (req, res) => {
  res.status(200).send({ status: 200, data: messages });
});
export default router;
