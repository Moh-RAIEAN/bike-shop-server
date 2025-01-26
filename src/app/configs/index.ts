import dotenv from 'dotenv';
import path from 'node:path';
import { TconfigOptions } from './configTypes';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const configOptions: TconfigOptions = {
  port: Number(process.env.PORT) || 5000,
  env: `${process.env.NODE_ENV}`,
  databaseUrl: `${process.env.DATABASE_URL}`,
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  clientUrl: String(process.env.CLIENT_URL),
  jwtAccessTokenSecret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
  jwtRegreshTokenSecret: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
  jwtAccessTokenExpiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRES_IS}`,
  jwtRefreshTokenExpiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}`,
  jwtResetPasswordSecret: `${process.env.JWT_RESET_PASSWORD_SECRET}`,
  jwtResetTokenExpiresIn: `${process.env.JWT_RESET_TOKEN_EXPIRES_IN}`,
  cloudinaryCloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  cloudinaryApiKey: `${process.env.CLOUDINARY_API_KEY}`,
  cloudinaryApiSecret: `${process.env.CLOUDINARY_API_SECRET}`,
  cloudinaryUrl: `${process.env.CLOUDINARY_URL}`,
  getConfigOption: (option) => configOptions[option],
};

export default configOptions.getConfigOption;
