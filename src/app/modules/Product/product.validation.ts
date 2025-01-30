import { z } from 'zod';

const imageFileValidationSchema = z.object(
  {
    originalname: z.string(),
    mimetype: z.enum(['image/png', 'image/jpeg']),
    size: z.number().max(2 * 1024 * 1024, 'Each file must be under 2MB'),
  },
  { required_error: 'product image is required' },
);

const createProductValidationSchema = z.object({
  file: imageFileValidationSchema,
  body: z.object({
    name: z.string(),
    brand: z.string(),
    modelName: z.string(),
    category: z.string(),
    price: z.number().positive(),
    description: z.string().optional(),
    frameMaterial: z.string(),
    wheelSize: z.number().positive(),
    gearCount: z.number().positive(),
    brakeType: z.string(),
    weight: z.number().positive(),
    quantity: z.number().nonnegative(),
    batteryCapacity: z.number().nonnegative(),
    topSpeed: z.number().nonnegative(),
    engineType: z.string(),
    maxPower: z.number().nonnegative(),
    mileagePerLiter: z.number().nonnegative(),
    inStock: z.boolean(),
    isDeleted: z.boolean(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
};
