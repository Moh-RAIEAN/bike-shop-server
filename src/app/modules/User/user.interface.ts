import { Model } from 'mongoose';
import { UserConstants } from './user.constants';

export type TUserRoles = keyof typeof UserConstants.userRolesMapper;

export type TUser = {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  role: TUserRoles;
};

export type TUserMethods = {
  comparePassword(password: string): Promise<boolean>;
  updatePassword: (userId: string, password: string) => Promise<TUser | null>;
};
export interface TUserModel
  extends Model<TUser, Record<string, unknown>, TUserMethods> {
  isUserExistWithEmail: (email: string) => Promise<TUser | null>;
}
