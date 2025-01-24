import { ZodSchema } from 'zod';

const parseDataFromZodSchema = <T>(schema: ZodSchema, data: T): T => {
  return schema.parse(data);
};

export default parseDataFromZodSchema;
