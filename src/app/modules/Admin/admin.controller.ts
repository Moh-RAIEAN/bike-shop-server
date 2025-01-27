import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getUser = catchAsync(async (req, res) => {
  const userId = req.params?.userId;
  const retrivedUser = await AdminServices.getUserFromDb(userId);
  sendResponse(res, {
    message: 'User retrived successfully',
    data: retrivedUser,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const query = req.query;
  const retrivedUsersData = await AdminServices.getUsersFromDb(query);
  sendResponse(res, {
    message: 'Users retrived successfully',
    meta: retrivedUsersData?.meta,
    data: retrivedUsersData?.data,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const userId = req.params?.userId;
  const statusData = req.body;
  const userWithUpdatedStatus = await AdminServices.changeUserStatus(
    userId,
    statusData,
  );
  sendResponse(res, {
    message: 'Users status changed successfully',
    meta: userWithUpdatedStatus,
  });
});

export const AdminControllers = {
  getUser,
  getUsers,
  changeUserStatus,
};
