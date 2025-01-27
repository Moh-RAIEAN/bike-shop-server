import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.services';

const getUserProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const userProfile = await UserServices.getUserProfile(user);
  sendResponse(res, {
    message: 'User profile retrived successfully',
    data: userProfile,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const updatedUserProfileData = req.body;
  const file = req.file;
  if (file) updatedUserProfileData.profileImage = file;
  const updatedUserProfile = await UserServices.updateUserProfile(
    user,
    updatedUserProfileData,
  );
  sendResponse(res, {
    message: 'User profile updated successfully',
    data: updatedUserProfile,
  });
});

export const UserController = {
  getUserProfile,
  updateUserProfile,
};
