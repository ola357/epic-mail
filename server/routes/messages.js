const Joi = require('joi');
const express = require('express');
var date = new Date();
const messages  = [
    {id: 1, createdOn: Date.now, subject: "Hello Friend", parentMessageId: 1, status: "read"},
];

const router = express.Router();

router.get('/', (req, res) => {
  // for (let index = 0; index < messages.length; index++) {
  //   if(messages[index].status !== 'read' || messages[index].status !== 'unread' )
  //     delete messages[index];
  // }
  res.status(200).send({ status: 200, data: messages });
});

export default router;