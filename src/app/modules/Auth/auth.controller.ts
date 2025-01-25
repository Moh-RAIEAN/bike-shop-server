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

export const AuthControllers = {
  registerUser,
  login,
};
