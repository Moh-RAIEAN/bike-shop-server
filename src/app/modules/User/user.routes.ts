import { Router } from 'express';
import auth from '../../middlewares/auth';
import { UserConstants } from './user.constants';
import { UserController } from './user.controller';

export const UserRouter: Router = Router();

const { userRoles, userRolesMapper } = UserConstants;
const { admin } = userRolesMapper;

UserRouter.get('/me', auth(...userRoles), UserController.getUserProfile);
UserRouter.get('/:userId', auth(admin), UserController.getUser);
