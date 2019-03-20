import express from 'express';
import GroupsController from '../controllers/GroupsController';
import Authorise from '../middleware/Authorise';

const router = express.Router();


router.post('/', Authorise.protect, GroupsController.createGroup);

router.get('/', Authorise.protect, GroupsController.getGroups);

// router.patch('/:groupId/name', Authorise.protect, );

// router.delete('/:groupId', Authorise.protect, );

// router.post('/:groupId/users', Authorise.protect, );

// router.post('/:groupId/messages', Authorise.protect, );

// router.delete('/:groupId/users/:userId', Authorise.protect, );

export default router;
