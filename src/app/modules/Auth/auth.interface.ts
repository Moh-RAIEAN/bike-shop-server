import { Secret } from 'jsonwebtoken';
import { TUserRoles } from '../User/user.interface';

export type TLoginUser = {
  id: string;
  password: string;
  expiresIn: string;
};

export type TJwtPayload = {
  id: string;
  role: TUserRoles;
};

export type TcreateJwtTokenFn = (
  payload: TJwtPayload,
  secret: Secret,
  expiresIn: string,
) => string;
