import { StatusCodes } from 'http-status-codes';
import JWT, { JwtPayload } from 'jsonwebtoken';
import getConfigOption from '../configs';
import AppError from '../errors/AppError';
import { TUserRoles } from '../modules/User/user.interface';
import User from '../modules/User/user.model';
import catchAsync from './catchAsync';

const auth = (...requiredRoles: TUserRoles[]) =>
  catchAsync(async (req, _res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken)
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized!');

    // 'Bearer restJwtToken.....'
    const bearer = authToken.split(' ')[1];
    const decoded = JWT.verify(
      bearer,
      getConfigOption('jwtAccessTokenSecret'),
    ) as JwtPayload;

    const { email } = decoded;
    const user = await User.isUserExistWithEmail(email);
    if (!user) throw new AppError(StatusCodes.NOT_FOUND, 'user not found!');

    const isUserIsPemitted = requiredRoles.includes(user?.role);
    if (!isUserIsPemitted)
      throw new AppError(StatusCodes.FORBIDDEN, 'access permission denied!');
    req.user = decoded;

    next();
  });

export default auth;
