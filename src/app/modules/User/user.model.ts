import { model, Schema } from 'mongoose';
import setDefaultSchemaOptions from '../../../helpers/applyDefaultSchema';
import { UserConstants } from './user.constants';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, 'user name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
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

setDefaultSchemaOptions(userSchema);

const User = model<TUser>('User', userSchema);

export default User;
