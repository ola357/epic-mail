import express from 'express';
import GroupsController from '../controllers/GroupsController';

const router = express.Router();


router.get('/', GroupsController.getGroups);

router.post('/', GroupsController.createGroup);

router.post('/:groupId/users', GroupsController.createUserToGroup);

router.post('/:groupId/messages', GroupsController.createNewGroupMessage);

router.delete('/:groupId', GroupsController.deleteSpecificGroup);

router.delete('/:groupId/users/:userId', GroupsController.deleteSpecificUserInGroup);
export default router;
