/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import getConfigOption from '../../configs';
import AppError from '../../errors/AppError';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const createUserIntoDb = async (profileImage: any, payload: TUser) => {
  const isUserExist = await User.isUserExistWithEmail(payload?.email);
  if (isUserExist)
    throw new AppError(StatusCodes.BAD_REQUEST, 'Email is already registered', [
      { path: 'email', message: 'Email is already registered' },
    ]);

  if (profileImage) {
    const { secure_url } = await uploadImageToCloudinary(profileImage);
    payload.profileImage = secure_url || '';
  }

  const newUser = await User.create(payload);
  if (!newUser)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not create user, internal server error',
    );

  const jwtPayload = {
    id: String(newUser?._id),
    email: String(newUser?.email),
    role: newUser?.role,
  };

  const createdAccessToken = createToken(
    jwtPayload,
    getConfigOption('jwtAccessTokenSecret'),
    getConfigOption('jwtAccessTokenExpiresIn'),
  );

  const createdRefreshToken = createToken(
    jwtPayload,
    getConfigOption('jwtRegreshTokenSecret'),
    getConfigOption('jwtRefreshTokenExpiresIn'),
  );

  return { createdAccessToken, createdRefreshToken };
};

const login = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const isUserExist = await User.isUserExistWithEmail(email, {
    includePasswordField: true,
  });
  if (!isUserExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [
      { path: 'email', message: 'User not found' },
    ]);

  const isPasswordMatched = await isUserExist.checkIsPasswordMatched(password);
  if (!isPasswordMatched)
    throw new AppError(StatusCodes.BAD_REQUEST, 'Incorrect password', [
      { path: 'password', message: 'Incorrect password' },
    ]);

  const jwtPayload = {
    id: String(isUserExist?._id),
    email: String(isUserExist?.email),
    role: isUserExist?.role,
  };

  const createdAccessToken = createToken(
    jwtPayload,
    getConfigOption('jwtAccessTokenSecret'),
    getConfigOption('jwtAccessTokenExpiresIn'),
  );

  const createdRefreshToken = createToken(
    jwtPayload,
    getConfigOption('jwtRegreshTokenSecret'),
    getConfigOption('jwtRefreshTokenExpiresIn'),
  );

  return { createdAccessToken, createdRefreshToken };
};

const changePassword = async (
  user: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const { email } = user;
  const { currentPassword, newPassword } = payload;
  const isUserExist = await User.isUserExistWithEmail(email, {
    includePasswordField: true,
  });
  if (!isUserExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [
      { path: 'email', message: 'User not found' },
    ]);

  const isPasswordMatched =
    await isUserExist.checkIsPasswordMatched(currentPassword);
  if (!isPasswordMatched)
    throw new AppError(StatusCodes.BAD_REQUEST, 'Incorrect password', [
      { path: 'password', message: 'Incorrect password' },
    ]);

  const userWithUpdatedPassword = await isUserExist.updatePassword(newPassword);
  if (!userWithUpdatedPassword)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not update password, internal server error',
    );

  return { updated: true };
};

const forgotPassword = async (email: string) => {
  const isUserExist = await User.isUserExistWithEmail(email);
  if (!isUserExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [
      { path: 'email', message: 'User not found' },
    ]);

  const { _id, role } = isUserExist;
  const resetJwtToken = createToken(
    { id: _id.toString(), role, email },
    getConfigOption('jwtResetPasswordSecret'),
    getConfigOption('jwtResetTokenExpiresIn'),
  );
  const resetPasswordUiLink = `${getConfigOption('clientUrl')}/auth/reset-password?userEmail=${email}&token=${resetJwtToken}`;

  // ! sendemail to user mail
  return { resetPasswordUiLink };
};

const resetPassword = async (
  token: string,
  payload: Pick<TLoginUser, 'email' | 'password'>,
) => {
  const { email: decodedEmail } = Jwt.verify(
    token,
    getConfigOption('jwtResetPasswordSecret'),
  ) as JwtPayload;
  const { email, password: resetedPassword } = payload;
  if (decodedEmail !== email)
    throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication failed');

  const isUserExist = await User.isUserExistWithEmail(email);
  if (!isUserExist)
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found', [
      { path: 'email', message: 'User not found' },
    ]);

  const userWithResetedPassword =
    await isUserExist.updatePassword(resetedPassword);
  if (!userWithResetedPassword)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not reset password, internal server error',
    );

  // ! sendemail to user mail
  return { reseted: true };
};

export const AuthServices = {
  createUserIntoDb,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
};
