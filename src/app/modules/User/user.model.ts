import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import setDefaultSchemaOptions from '../../../helpers/applyDefaultSchema';
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

userSchema.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  updatePassword: async function (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.updateOne({ password: hashedPassword });
  },
};

userSchema.statics = {
  isUserExistWithEmail: async (email) => {
    return User.findOne({ email });
  },
};

setDefaultSchemaOptions(userSchema);

const User = model<TUser, TUserModel>('User', userSchema);

export default User;
