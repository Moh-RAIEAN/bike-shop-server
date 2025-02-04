import { AnyZodObject } from 'zod';
import catchAsync from './catchAsync';
const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, _, next) => {
    try {
      await schema.parseAsync({
        file: req.file,
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      });

      next();
    } catch (err) {
      next(err);
    }
  });
};

export default validateRequest;
