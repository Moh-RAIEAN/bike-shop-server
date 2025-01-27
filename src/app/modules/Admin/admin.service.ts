import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserConstants } from '../User/user.constants';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';

const getUserFromDb = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  return user;
};

const getUsersFromDb = async (query: Record<string, unknown>) => {
  const userRole = UserConstants?.userRolesMapper?.customer;
  const getUsersQuery = new QueryBuilder(User.find({ role: userRole }), query)
    .search(UserConstants.searchableFields)
    .filter()
    .sort()
    .paginate();

  const retrivedUsers = await getUsersQuery.modelQuery;
  const meta = await getUsersQuery.countTotal();
  if (!retrivedUsers?.length)
    throw new AppError(StatusCodes.NOT_FOUND, 'No user not found');
  return { meta, data: retrivedUsers };
};

const changeUserStatus = async (
  userId: string,
  payload: Pick<TUser, 'status'>,
) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  const userWithUpdatedStatus = await User.findByIdAndUpdate(
    userId,
    { status: payload?.status },
    { new: true, runValidators: true },
  );
  if (!userWithUpdatedStatus)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not change user status, internal server error',
    );
  return userWithUpdatedStatus;
};
export const AdminServices = {
  getUserFromDb,
  getUsersFromDb,
  changeUserStatus,
};
