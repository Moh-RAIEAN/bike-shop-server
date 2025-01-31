import getConfigOption from '../../configs';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const profileImage = req.file;

  const { createdAccessToken, createdRefreshToken } =
    await AuthServices.createUserIntoDb(profileImage, userData);

  const cookieOptions = {
    httpOnly: true,
    secure: getConfigOption('env') === 'development',
  };
  res.cookie('refreshToken', createdRefreshToken, cookieOptions);

  sendResponse(res, {
    message: 'User registered successfully',
    data: createdAccessToken,
  });
});

const login = catchAsync(async (req, res) => {
  const authData = req.body;

  const { createdAccessToken, createdRefreshToken } =
    await AuthServices.login(authData);

  const cookieOptions = {
    httpOnly: true,
    secure: getConfigOption('env') === 'development',
  };
  res.cookie('refreshToken', createdRefreshToken, cookieOptions);

  sendResponse(res, {
    message: 'User logged in successfully',
    data: createdAccessToken,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const passwordData = req.body;

  await AuthServices.changePassword(user, passwordData);
  sendResponse(res, {
    message: 'Password is changed successfully',
    data: null,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const email = req.body?.email;

  const result = await AuthServices.forgotPassword(email);
  sendResponse(res, {
    message: 'Reset password link mail sended successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const payload = req.body;
  const token = req.query?.token;

  const resetPasswordUiLink = await AuthServices.resetPassword(
    String(token),
    payload,
  );
  sendResponse(res, {
    message: 'Password reseted successfully',
    data: resetPasswordUiLink,
  });
});

export const AuthControllers = {
  registerUser,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
};
