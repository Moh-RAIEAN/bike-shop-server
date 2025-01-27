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

export const UserController = {
  getUserProfile,
};
