import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email().trim(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'Current Password is required',
    }),
    newPassword: z.string({ required_error: 'New Password is required' }),
  }),
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

const resettPasswordSchema = z.object({
  query: z.object({
    token: z.string({ required_error: 'Token is required' }),
  }),
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resettPasswordSchema,
};
