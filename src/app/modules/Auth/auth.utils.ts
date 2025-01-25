import jwt from 'jsonwebtoken';
import { TcreateJwtTokenFn } from './auth.interface';

export const createToken: TcreateJwtTokenFn = (
  jwtPayload,
  secret,
  expiresIn,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as jwt.SignOptions);
};
