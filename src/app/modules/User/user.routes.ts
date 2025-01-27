import { Router } from 'express';
import auth from '../../middlewares/auth';
import catchAsync from '../../middlewares/catchAsync';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/uploadImageToCloudinary';
import { UserConstants } from './user.constants';
import { UserController } from './user.controller';
import { UserValidations } from './user.validation';

export const UserRouter: Router = Router();

const { userRoles } = UserConstants;

UserRouter.get('/me', auth(...userRoles), UserController.getUserProfile);

UserRouter.patch(
  '/update-profile',
  auth(...userRoles),
  upload.single('profileImage'),
  catchAsync(async (req, _res, next) => {
    const parsedUserData = JSON.parse(req.body?.userData);
    req.body = parsedUserData;
    next();
  }),
  validateRequest(UserValidations.updateUserSchema),
  UserController.updateUserProfile,
);
