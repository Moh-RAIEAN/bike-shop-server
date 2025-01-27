import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserConstants } from '../User/user.constants';
import { AdminControllers } from './admin.controller';
import { adminValidations } from './admin.validation';

export const AdminRouter: Router = Router();
const { userRolesMapper } = UserConstants;
const { admin } = userRolesMapper;

AdminRouter.get('/users', auth(admin), AdminControllers.getUsers);
AdminRouter.get('/users/:userId', auth(admin), AdminControllers.getUser);
AdminRouter.patch(
  '/users/change-status/:userId',
  auth(admin),
  validateRequest(adminValidations.changeUserStatusSchama),
  AdminControllers.changeUserStatus,
);
