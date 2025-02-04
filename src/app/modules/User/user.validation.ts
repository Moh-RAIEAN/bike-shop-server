import { z } from 'zod';

const addressSchema = z
  .object({
    street: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  })
  .optional();

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    email: z.string({ required_error: 'Email is required' }).email().trim(),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const needsToUpdateProfileSchema = z.object({
  name: z.string().optional(),
  address: z.object(
    {
      street: z.string({ required_error: 'Street is required' }),
      city: z.string({ required_error: 'City is requried' }),
      postalCode: z.string({ required_error: 'Postal Code is required' }),
      country: z.string({ required_error: 'Country is required' }),
    },
    { required_error: 'Address is required' },
  ),
  contactNo: z.string({ required_error: 'Contact No is required' }),
});
const updateUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    address: addressSchema,
    contactNo: z.string().optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserSchema,
  needsToUpdateProfileSchema,
};
