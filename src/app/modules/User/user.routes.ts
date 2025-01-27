import { Router } from 'express';
import auth from '../../middlewares/auth';
import { UserConstants } from './user.constants';
import { UserController } from './user.controller';

export const UserRouter: Router = Router();

const { userRoles } = UserConstants;

UserRouter.get('/me', auth(...userRoles), UserController.getUserProfile);
