import { z } from 'zod';
import { UserConstants } from '../User/user.constants';

const changeUserStatusSchama = z.object({
  body: z.object({
    status: z.enum(UserConstants.userStatuses as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

export const adminValidations = { changeUserStatusSchama };
