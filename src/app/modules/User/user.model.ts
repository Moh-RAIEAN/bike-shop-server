/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { CallbackError, model, Schema } from 'mongoose';
import setDefaultSchemaOptions from '../../../helpers/applyDefaultSchema';
import getConfigOption from '../../configs';
import { UserConstants } from './user.constants';
import { TAddress, TUser, TUserMethods, TUserModel } from './user.interface';

export const addressSchema = new Schema<TAddress>({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

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
  address: {
    type: addressSchema,
  },
  contactNo: {
    type: String,
  },
  role: {
    type: String,
    enum: UserConstants?.userRoles,
    default: UserConstants?.userRolesMapper.customer,
  },
  status: {
    type: String,
    enum: UserConstants.userStatuses,
    default: UserConstants?.userStatusMapper?.active,
  },
  needsToUpdateProfile: {
    type: Boolean,
    default: true,
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
  isUserExistWithEmail: async (email, options) => {
    return options?.includePasswordField
      ? User.findOne({ email }).select('+password')
      : User.findOne({ email });
  },
};

setDefaultSchemaOptions(userSchema);

const User = model<TUser, TUserModel>('User', userSchema);

export default User;
