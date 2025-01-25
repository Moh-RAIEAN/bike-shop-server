import { Document, Model, Types } from 'mongoose';
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
  checkIsPasswordMatched(password: string): Promise<boolean>;
  updatePassword: (
    userId: string,
    password: string,
  ) => Promise<
    | (Document<unknown, Record<string, unknown>, TUser> &
        Omit<
          TUser & {
            _id: Types.ObjectId;
          } & {
            __v: number;
          },
          keyof TUserMethods
        > &
        TUserMethods)
    | null
  >;
};
export interface TUserModel
  extends Model<TUser, Record<string, unknown>, TUserMethods> {
  isUserExistWithEmail: (
    email: string,
    includePassword?: boolean,
  ) => Promise<
    | (Document<unknown, Record<string, unknown>, TUser> &
        Omit<
          TUser & {
            _id: Types.ObjectId;
          } & {
            __v: number;
          },
          keyof TUserMethods
        > &
        TUserMethods)
    | null
  >;
}
