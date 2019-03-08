const Joi = require('joi');
const express = require('express');
const messages  = [
    {}
]

const router = express.Router();

router.get('/', (req, res) => {
  // console.log(res);
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < messages.length; index++) {
    delete messages[index].hqAddress;
  }
  res.send({ status: 200, data: messages });
});