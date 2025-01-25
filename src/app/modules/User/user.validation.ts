import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    email: z.string({ required_error: 'Email is required' }).email().trim(),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const UserValidations = { createUserValidationSchema };
