import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import User from './user.model';

const getUserProfile = async (payload: JwtPayload) => {
  const { id } = payload;
  const user = await User.findById(id);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  return user;
};

export const UserServices = {
  getUserProfile,
};
