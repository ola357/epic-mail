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
  /**
   * Get all Recieved messages
   */
  static async getRecievedMessages(req, res) {
    const userId = req.user._id;
    const inbox = await db.query(
      'SELECT * FROM messages WHERE receiverid = ($1) ORDER BY createdon DESC', [userId],
    );
    if (inbox.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        error: "Inbox is empty.",
      });
    }

    res.status(200).send({ status: 200, data: inbox.rows });
  }
  /**
   *
   * Get all unread messages
   */

  static async getUnreadMessages(req, res) {
    const userId = req.user._id;
    const status = "sent";
    const inbox = await db.query(
      'SELECT * FROM messages WHERE receiverid = ($1) AND status = ($2) ORDER BY createdon DESC', [userId, status],
    );
    if (inbox.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        error: "No Unread messages.",
      });
    }
    res.status(200).send({ status: 200, data: inbox.rows });
  }

  /**
 * Get all sent messages
 *
 */
  static async getSentMessages(req, res) {
    const userId = req.user._id;
    const sent = await db.query(
      'SELECT * FROM messages WHERE senderid = ($1) ORDER BY createdon DESC', [userId],
    );
    if (sent.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        error: "No Sent Messages.",
      });
    }
    res.status(200).send({ status: 200, data: sent.rows });
  }
  /**
   *
   * Get A Specific Message
   */

  static async getSpecificMessage(req, res) {
    const mailId = parseInt(req.params.messageid, 10);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(mailId)) return res.status(400).send({ status: 400, error: "Bad Request" });

    const mail = await db.query(
      'SELECT * FROM messages WHERE id = ($1)', [mailId],
    );

    if ((mail.rowCount === 0)) {
      return res.status(404).send({
        status: 404,
        error: "The message with the given ID was not found.",
      });
    }

    if ((mail.rows[0].senderid !== req.user._id) && (mail.rows[0].receiverid !== req.user._id)) {
      return res.status(403).send({
        status: 403,
        error: "Unauthorized.",
      });
    }

    const {
      id, createdon, subject, message, senderid, receiverid, parentmessageid, status,
    } = mail.rows[0];

    if (req.user_id === receiverid) {
      await db.query(
        'UPDATE messages SET status = ($1) WHERE id = ($2) RETURNING *', ["read", mailId],
      );
    }

    res.send({
      status: 200,
      data: [{
        id,
        createdOn: createdon,
        subject,
        message,
        senderId: senderid,
        receiverid,
        parentMessageId: parentmessageid,
        status,
      }],
    });
  }
  /**
   *
   * Create a New message
   */

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

    const receiverid = result.rows[0].id;
    const senderId = req.user._id;

    const email = await db.query(
      `INSERT INTO messages(
        subject, message, parentmessageId, status, receiverid, senderid) 
         VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      [subject, message, parentMessageId, status, receiverid, senderId],
    );

    res.send({ status: 200, data: [email.rows] });
  }
  /**
   * Delete a Specific Message
   *
   */

  static async deleteSpecificMessage(req, res) {
    const mailId = parseInt(req.params.id, 10);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(mailId)) return res.status(400).send({ status: 400, error: "Bad Request" });

    const mail = await db.query(
      'SELECT * FROM messages WHERE id = ($1)', [mailId],
    );

    if ((mail.rowCount === 0)) {
      return res.status(404).send({
        status: 404,
        error: "The message with the given ID was not found.",
      });
    }

    if ((mail.rows[0].senderid !== req.user._id) && (mail.rows[0].receiverid !== req.user._id)) {
      return res.status(403).send({
        status: 403,
        error: "Unauthorized.",
      });
    }

    if (req.user_id === mail.rows[0].receiverid) {
      await db.query(
        'UPDATE messages SET receiverid = ($1) WHERE id = ($2) RETURNING *', [null, mailId],
      );
      res.send({ status: 200, data: [{ message: `mail has been deleted` }] });
    }
    if (req.user_id === mail.rows[0].senderid) {
      await db.query(
        'UPDATE messages SET senderid = ($1) WHERE id = ($2) RETURNING *', [null, mailId],
      );
      res.send({ status: 200, data: [{ message: `mail has been deleted` }] });
    }
    if ((mail.rows[0].senderid === null) && (mail.rows[0].receiverid === null)) {
      await db.query(`
      DELETE FROM messages 
      WHERE id = ($1)`,
      [mailId]);
      res.send({ status: 200, data: [{ message: `message does not exist` }] });
    }
  }
}
export default MessagesController;
