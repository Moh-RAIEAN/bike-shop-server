import { Router } from 'express';
import catchAsync from '../../middlewares/catchAsync';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/uploadImageToCloudinary';
import { UserValidations } from '../User/user.validation';
import { AuthControllers } from './auth.controller';

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
