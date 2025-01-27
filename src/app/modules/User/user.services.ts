import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { pick } from '../../utils/pick';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { TUser } from './user.interface';
import User from './user.model';

const getUserProfile = async (payload: JwtPayload) => {
  const { id } = payload;
  const user = await User.findById(id);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  return user;
};

const updateUserProfile = async (user: JwtPayload, payload: TUser) => {
  const { id } = user;
  const userDataToUpdate = pick(payload, ['name', 'profileImage']);

  const isUserExist = await User.findById(id);
  if (!isUserExist) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');

  if (userDataToUpdate?.profileImage) {
    const { secure_url } = await uploadImageToCloudinary(
      userDataToUpdate?.profileImage,
    );
    userDataToUpdate.profileImage = secure_url;
  }
  const updatedUserProfile = await User.findByIdAndUpdate(
    id,
    userDataToUpdate,
    { new: true, runValidators: true },
  );
  if (!updatedUserProfile)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'can not update user profile, internal server error',
    );
  return updatedUserProfile;
};

export const UserServices = {
  getUserProfile,
  updateUserProfile,
};
