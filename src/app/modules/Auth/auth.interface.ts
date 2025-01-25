import { Secret } from 'jsonwebtoken';
import { TUserRoles } from '../User/user.interface';

export type TLoginUser = {
  email: string;
  password: string;
  expiresIn: string;
};

export type TJwtPayload = {
  id: string;
  email: string;
  role: TUserRoles;
};

export type TcreateJwtTokenFn = (
  payload: TJwtPayload,
  secret: Secret,
  expiresIn: string,
) => string;
