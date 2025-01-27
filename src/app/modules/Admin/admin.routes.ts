import { Router } from 'express';
import auth from '../../middlewares/auth';
import { UserConstants } from '../User/user.constants';
import { AdminControllers } from './admin.controller';

export const AdminRouter: Router = Router();
const { userRolesMapper } = UserConstants;
const { admin } = userRolesMapper;

AdminRouter.get('/users', auth(admin), AdminControllers.getUsers);
AdminRouter.get('/users/:userId', auth(admin), AdminControllers.getUser);
