import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { pick } from '../../utils/pick';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { TUser } from './user.interface';
import User from './user.model';
import { UserValidations } from './user.validation';

const getUserProfile = async (payload: JwtPayload) => {
  const { id } = payload;
  const user = await User.findById(id);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  return user;
};

const updateUserProfile = async (user: JwtPayload, payload: TUser) => {
  const { id } = user;
  let userDataToUpdate: Record<string, unknown> = pick(payload, [
    'name',
    'profileImage',
    'contactNo',
  ]);
  const updatedAddress = pick(payload, ['address']);

  const isUserExist = await User.findById(id);
  if (!isUserExist) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');

  if (
    isUserExist?.needsToUpdateProfile &&
    (updatedAddress || userDataToUpdate?.contactNo)
  ) {
    const parsedUserDataToUpdate =
      await UserValidations.needsToUpdateProfileSchema.parseAsync({
        ...userDataToUpdate,
        address: updatedAddress?.address,
      });
    userDataToUpdate = {
      ...userDataToUpdate,
      parsedUserDataToUpdate,
      needsToUpdateProfile: false,
    };
  }
  if (updatedAddress) {
    const address = updatedAddress?.address as Record<string, unknown>;
    const modifiedUserAddress = Object.keys(address).reduce(
      (acc, field) => ({ ...acc, [`address.${field}`]: address[field] }),
      {},
    );
    userDataToUpdate = { ...userDataToUpdate, ...modifiedUserAddress };
  }
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
