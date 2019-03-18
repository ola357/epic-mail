
import messages from '../models/messages';
import Validate from '../validators/Validates';
import db from '../models/db';


/**
 * Class representing API endpoints for
 * the route for messages controller
 * @param { array } inbox
 * @param { array } sent
 *  @param { object } request
 * @param { object } response
 * @returns { object } response
 */
class MessagesController {
  static async getRecievedMessages(req, res) {
    const inbox = await db.query(
      'SELECT * FROM "messages" WHERE "status" = "read" OR "status" = "unread" ORDER BY "createdOn" DESC',
    );
    console.log(inbox);
    /* const inbox = [];
    for (let index = 0; index < messages.length; index += 1) {
      if (messages[index].status === 'read' || messages[index].status === 'unread') {
        inbox.push(messages[index]);
      }
    } */
    res.status(200).send({ status: 200, data: inbox });
  }

  static async getUnreadMessages(req, res) {
    const inbox = await db.query(
      'SELECT * FROM "messages" WHERE "status" = "unread" ORDER BY "createdOn DESC',
    );
    /*  [];
    for (let index = 0; index < messages.length; index += 1) {
      if (messages[index].status === 'unread') {
        inbox.push(messages[index]);
      }
    } */
    res.status(200).send({ status: 200, data: inbox });
  }

  static getSentMessages(req, res) {
    const sent = [];
    for (let index = 0; index < messages.length; index += 1) {
      if (messages[index].status === 'sent') {
        sent.push(messages[index]);
      }
    }
    res.status(200).send({ status: 200, data: sent });
  }

  static getSpecificMessage(req, res) {
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
  }

  static async createNewMessage(req, res) {
    const { error } = Validate.createMessage(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const {
      address, subject, message, parentMessageId, status,
    } = req.body;

    const result = await db.query(
      'SELECT * FROM users WHERE email = ($1)', [address],
    );
    if (result.rowCount !== 1) return res.status(400).send('Invalid email address');

    const recieverId = result.rows[0].id;
    const senderId = req.user._id;
    // const createdOn = new Date().getTime();

    const email = await db.query(
      'INSERT INTO messages(subject, message, parentmessageId, status, recieverid, senderid) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
      [subject, message, parentMessageId, status, recieverId, senderId],
    );
    /*  {
      createdOn: Date.now(),
      subject,
      message,
      parentMessageId,
      status,
      recieverId: result.rows[0].id,
      senderId: req.user.id,
    };
    messages.push(email); */
    res.send({ status: 200, data: [email] });
  }

  static deleteSpecificMessage(req, res) {
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
  }
}
export default MessagesController;
