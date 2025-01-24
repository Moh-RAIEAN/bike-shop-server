import { UserConstants } from './user.constants';

export type TUserRoles = keyof typeof UserConstants.userRolesMapper;

export type TUser = {
  name: string;
  email: string;
  profileImage?: string;
  role: TUserRoles;
};
