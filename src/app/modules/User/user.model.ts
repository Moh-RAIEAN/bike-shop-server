/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { CallbackError, model, Schema } from 'mongoose';
import setDefaultSchemaOptions from '../../../helpers/applyDefaultSchema';
import getConfigOption from '../../configs';
import { UserConstants } from './user.constants';
import { TUser, TUserMethods, TUserModel } from './user.interface';

const userSchema = new Schema<TUser, TUserModel, TUserMethods>({
  name: {
    type: String,
    required: [true, 'user name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: 0,
  },
  profileImage: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: UserConstants.userRoles,
    default: UserConstants?.userRolesMapper.customer,
  },
});

userSchema.pre('save', async function (next) {
  try {
    const user = this;
    const hashedPassword = await bcrypt.hash(
      user?.password,
      getConfigOption('bcryptSaltRounds'),
    );

    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods = {
  checkIsPasswordMatched: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  updatePassword: async function (password) {
    const hashedPassword = await bcrypt.hash(
      password,
      getConfigOption('bcryptSaltRounds'),
    );
    return this.updateOne({ password: hashedPassword });
  },
};

userSchema.statics = {
  isUserExistWithEmail: async (email, includePassword = false) => {
    return includePassword
      ? User.findOne({ email }).select('+password')
      : User.findOne({ email });
  },
};

setDefaultSchemaOptions(userSchema);

const User = model<TUser, TUserModel>('User', userSchema);

export default User;
