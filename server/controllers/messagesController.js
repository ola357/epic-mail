import messages from '../models/messages';
import validate from '../validators/validate';

const messagesController = {
  getRecievedMessages: (req, res) => {
    const inbox = [];
    for (let index = 0; index < messages.length; index += 1) {
      if (messages[index].status === 'read' || messages[index].status === 'unread') {
        inbox.push(messages[index]);
      }
    }
    res.status(200).send({ status: 200, data: inbox });
  },
  getUnreadMessages: (req, res) => {
    const inbox = [];
    for (let index = 0; index < messages.length; index += 1) {
      if (messages[index].status === 'unread') {
        inbox.push(messages[index]);
      }
    }
    res.status(200).send({ status: 200, data: inbox });
  },
  getSentMessages: (req, res) => {
    const sent = [];
    for (let index = 0; index < messages.length; index += 1) {
      if (messages[index].status === 'sent') {
        sent.push(messages[index]);
      }
    }
    res.status(200).send({ status: 200, data: sent });
  },
  getSpecificMessage: (req, res) => {
    const message = messages.find(inbox => inbox.id === parseInt(req.params.id, 10));
    if (!message) {
      return res.status(404).send({
        status: 404,
        error: "The message with the given ID was not found.",
      });
    }
    res.send({
      status: 200,
      data: [{
        id: message.id,
        createdOn: message.createdOn,
        subject: message.subject,
        senderId: message.senderId,
        recieverId: message.recieverId,
        parentMessageId: message.parentMessageId,
        status: message.status,
      }],
    });
  },
  createNewMessage: (req, res) => {
    const { error } = validate.createMessage(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    const message = {
      id: messages.length + 1,
      createdOn: Date.now(),
      subject: req.body.subject,
      message: req.body.message,
      parentMessageId: 1,
      status: req.body.status,
    };
    messages.push(message);
    res.send({ status: 200, data: [message] });
  },
  deleteSpecificMessage: (req, res) => {
    const message = messages.find(inbox => inbox.id === parseInt(req.params.id, 10));
    if (!message) {
      return res.status(404).send({
        status: 404,
        error: "The message with the given ID was not found.",
      });
    }

    const index = messages.indexOf(message);
    messages.splice(index, 1);
    res.send({ status: 200, data: [{ id: message.id, message: `${message.id} has been deleted` }] });
  },
};

export default messagesController;
