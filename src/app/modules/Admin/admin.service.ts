import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserConstants } from '../User/user.constants';
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

export const AdminServices = {
  getUserFromDb,
  getUsersFromDb,
};
