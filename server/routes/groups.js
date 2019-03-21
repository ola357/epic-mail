import express from 'express';
import GroupsController from '../controllers/GroupsController';
import Authorise from '../middleware/Authorise';

const router = express.Router();


router.post('/', Authorise.protect, GroupsController.createGroup);

router.get('/', Authorise.protect, GroupsController.getGroups);

router.patch('/:groupId/name', Authorise.protect,  GroupsController.editGroupName);

 router.delete('/:groupId', Authorise.protect, GroupsController.deleteGroup);

 router.post('/:groupId/users', Authorise.protect, GroupsController.addUserToGroup);

 router.post('/:groupId/messages', Authorise.protect, GroupsController.createGroupMessages);

 router.delete('/:groupId/users/:userId', Authorise.protect, GroupsController.deleteUser);

export default router;
