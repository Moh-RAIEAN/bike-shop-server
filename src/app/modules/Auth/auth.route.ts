import { Router } from 'express';
import auth from '../../middlewares/auth';
import catchAsync from '../../middlewares/catchAsync';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/uploadImageToCloudinary';
import { UserConstants } from '../User/user.constants';
import { UserValidations } from '../User/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

export const AuthRouter: Router = Router();

AuthRouter.post(
  '/register',
  upload.single('profileImage'),
  catchAsync(async (req, _res, next) => {
    const parsedUserData = JSON.parse(req.body?.userData);
    req.body = parsedUserData;
    next();
  }),
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.registerUser,
);

AuthRouter.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

AuthRouter.post(
  '/change-password',
  auth(...UserConstants.userRoles),
  validateRequest(AuthValidations.changePasswordSchema),
  AuthControllers.changePassword,
);

AuthRouter.post(
  '/forgot-password',
  validateRequest(AuthValidations.forgotPasswordSchema),
  AuthControllers.forgotPassword,
);

AuthRouter.post(
  '/reset-password',
  validateRequest(AuthValidations.resettPasswordSchema),
  AuthControllers.resetPassword,
);
