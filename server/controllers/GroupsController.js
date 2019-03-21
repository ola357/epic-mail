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
class GroupsController {
  static async createGroup(req, res) {
    const { error } = Validate.createGroup(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const { name } = req.body;

    const group = await db.query(
      `INSERT INTO groups(name) 
      VALUES($1) RETURNING *`,
      [name],
    );
    const groupid = group.rows[0].id;
    const memberid = req.user._id;
    const role = "admin";
    const member = await db.query(
      `INSERT INTO groupmembers(groupid, memberid, role) 
      VALUES($1, $2, $3) RETURNING *`,
      [groupid, memberid, role],
    );

    res.status(200).send({
      status: 200,
      data: [
        {
          id: group.rows[0].id,
          name: group.rows[0].name,
          role: member.rows[0].role,
        },
      ],
    });
  }

  static async getGroups(req, res) {
    const userId = req.user._id;
    const groups = await db.query(
      `SELECT * FROM groupmembers 
      WHERE memberid = ($1) 
      INNER JOIN groups ON groupmembers.groupid = group.id`, [userId],
    );
    if (groups.rowCount === 0 || groups === null) {
      return res.status(404).send({
        status: 404,
        error: "You haven't joined any group.",
      });
    }
    res.status(200).send({ status: 200, data: groups.rows });
  }

  static async editGroupName(req, res) {
    const groupid = parseInt(req.params.groupId, 10);
    if (isNaN(groupid)) return res.status(400).send({ status: 400, error: "Bad Request" });

    const { error } = Validate.createGroup(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const { name } = req.body;
    const memberid = req.user._id;
    const member = await db.query(
      `SELECT role FROM groupmembers
        WHERE memberid = ($1)
        AND groupid = ($2)`,
      [memberid, groupid],
    );
    if (member.rowCount === 0 || member.rows[0].role === null) {
      return res.status(401).send({
        status: 401,
        error: "You are not a member of this group",
      });
    }
    const group = await db.query(
      `UPDATE groups 
        SET name = ($1) WHERE id = ($2) RETURNING *`, [name, groupid],
    );

    res.status(200).send({
      status: 200,
      data: [
        {
          id: group.rows[0].id,
          name: group.rows[0].name,
          role: member.rows[0].role,
        },
      ],
    });
  }

  /** *********************************
 * Delete a Group
 */
  static async deleteGroup() {
    const groupid = parseInt(req.params.groupId, 10);
    if (isNaN(groupid)) return res.status(400).send({ status: 400, error: "Bad Request" });

    const memberid = req.user._id;
    const member = await db.query(
      `SELECT role FROM groupmembers
        WHERE memberid = ($1)
        AND groupid = ($2)`,
      [memberid, groupid],
    );

    if (member.rowCount === 0 || member.rows[0].role === 'member') {
      return res.status(401).send({
        status: 401,
        error: "Not Allowed",
      });
    }
    await db.query(`
      DELETE FROM groups 
      WHERE id = ($1)`,
    [groupid]);
    res.send({ status: 200, data: [{ message: `group has been deleted` }] });
  }

  /** **********************************
 * Adds a New user to Group
 */
  static async addUserToGroup() {
    const groupid = parseInt(req.params.groupId, 10);
    if (isNaN(groupid)) return res.status(400).send({ status: 400, error: "Bad Request" });

    const { error } = Validate.addGroupUser(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    const { email, status } = req.body;

    const memberid = req.user._id;
    const member = await db.query(
      `SELECT role FROM groupmembers
        WHERE memberid = ($1)
        AND groupid = ($2)`,
      [memberid, groupid],
    );

    if (member.rowCount === 0 || member.rows[0].role === 'member') {
      return res.status(401).send({
        status: 401,
        error: "Not Allowed",
      });
    }

    const user = await db.query(
      `SELECT * FROM users
        WHERE email = ($1)`,
      [email],
    );
    if (user.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        error: "Not Allowed",
      });
    }

    const result = await db.query(
      `INSERT INTO groupmembers(groupid, memberid, role) 
      VALUES($1, $2, $3) RETURNING *`,
      [groupid, user.rows[0].id, status],
    );
    res.status(200).send({
      status: 200,
      data: [result.rows[0]],
    });
  }

  /** ****************************************************
   * Delete
   * A User From a Group
   */
  static async deleteUser() {
    const groupid = parseInt(req.params.groupId, 10);
    if (isNaN(groupid)) return res.status(400).send({ status: 400, error: "Bad Request" });

    const userid = parseInt(req.params.userId, 10);
    if (isNaN(userid)) return res.status(400).send({ status: 400, error: "Bad Request" });

    const memberid = req.user._id;
    const member = await db.query(
      `SELECT role FROM groupmembers
        WHERE memberid = ($1)
        AND groupid = ($2)`,
      [memberid, groupid],
    );

    if (member.rowCount === 0 || member.rows[0].role === 'member') {
      return res.status(401).send({
        status: 401,
        error: "Not Allowed",
      });
    }
    await db.query(`
      DELETE FROM groupmembers 
      WHERE memberid = ($1) 
      AND groupid = ($2) `,
    [userid, groupid]);
    res.send({ status: 200, data: [{ message: `user has been deleted` }] });
  }

  /** ***********************************
   * Send Messages to Groups
   */
  static async createGroupMessages() {
    const groupid = parseInt(req.params.groupId, 10);
    if (isNaN(groupid)) return res.status(400).send({ status: 400, error: "Bad Request" });

    const { error } = Validate.createGroupMessage(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const memberid = req.user._id;
    const member = await db.query(
      `SELECT * FROM groupmembers
        WHERE memberid = ($1)
        AND groupid = ($2)`,
      [memberid, groupid],
    );

    if (member.rowCount === 0) {
      return res.status(401).send({
        status: 401,
        error: "Not Allowed",
      });
    }

    const {
      subject, message, parentMessageId, status,
    } = req.body;
    let email;
    member.rows.forEach(async (element) => {
      const recieverId = element.memberid;
      const senderId = req.user._id;

      email = await db.query(
        `INSERT INTO messages(
          subject, message, parentmessageId, status, recieverid, senderid) 
           VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
        [subject, message, parentMessageId, status, recieverId, senderId],
      );
    });
    const { id, createdon, parentmessageid } = email.rows[0];
    res.send({
      status: 200,
      data: [{
        id,
        createdon,
        subject: email.rows[0].subject,
        message: email.rows[0].message,
        parentmessageid,
        status: email.rows[0].status,
      }],
    });
  }
}
export default GroupsController;
