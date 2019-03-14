import groups from '../models/groups';
import groupMessages from '../models/groupMessages';
import Validate from '../validators/Validates';

class GroupsController {
  static getGroups(req, res) {
    res.status(200).send({ status: 200, data: groups });
  }

  static createGroup(req, res) {
    const { error } = Validate.createNewGroup(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    const { name, role } = req.body;
    const group = {
      id: groups.length + 1,
      name,
      role,
    };
    groups.push(group);
    res.send({ status: 200, data: [group] });
  }

  static createUserToGroup(req, res) {
    const group = groups.find(c => c.id === parseInt(req.params.groupId, 10));
    if (!group) {
      return res.status(404).send({
        status: 404,
        error: "The group with the given ID was not found.",
      });
    }

    const { error } = Validate.addedUser(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });

    const { userId, userRole } = req.body;
    const groupMember = {
      groupId: group.groupId,
      userId,
      userRole,
    };

    group.groupMembers.push(groupMember);
    res.send({ status: 200, data: group.groupMembers });
  }

  static createNewGroupMessage(req, res) {
    const group = groups.find(c => c.id === parseInt(req.params.groupId, 10));
    if (!group) {
      return res.status(404).send({
        status: 404,
        error: "The group with the given ID was not found.",
      });
    }

    const { error } = Validate.createGroupMessage(req.body);
    if (error) return res.status(400).send({ status: 400, error: error.details[0].message });
    const { subject, message, status } = req.body;
    const email = {
      id: groups.length + 1,
      createdOn: Date.now(),
      subject,
      message,
      parentMessageId: 1,
      status,
    };
    groupMessages.push(email);
    res.send({ status: 200, data: [email] });
  }

  static deleteSpecificGroup(req, res) {
    const group = groups.find(cluster => cluster.id === parseInt(req.params.groupId, 10));
    if (!group) {
      return res.status(404).send({
        status: 404,
        error: "The group with the given ID was not found.",
      });
    }

    const index = groups.indexOf(group);
    groups.splice(index, 1);
    res.send({ status: 200, data: [{ id: group.id, message: `${group.id} has been deleted` }] });
  }

  static deleteSpecificUserInGroup(req, res) {
    const group = groups.find(cluster => cluster.id === parseInt(req.params.groupId, 10));
    if (!group) {
      return res.status(404).send({
        status: 404,
        error: "The group with the given ID was not found.",
      });
    }

    const user = groups.groupMembers.find(cluster => cluster.id === parseInt(req.params.userId, 10));
    if (!user) {
      return res.status(404).send({
        status: 404,
        error: "The user with the given ID was not found.",
      });
    }

    const index = groups.groupMembers.indexOf(user);
    groups.splice(index, 1);
    res.send({ status: 200, data: [{ id: user.id, message: `${user.id} has been deleted` }] });
  }
}

export default GroupsController;
