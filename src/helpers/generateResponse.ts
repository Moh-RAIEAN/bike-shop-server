import { ZodError } from 'zod';

type TOptions<T> = {
  generateResponseFor: T;
  message?: string;
};

const generateResponse = <T>(options: TOptions<T>) => {
  const { generateResponseFor, message = '' } = options;
  const responseData: Record<string, unknown> = { success: true, message: '' };

  if (generateResponseFor instanceof Error) {
    responseData.success = false;
    responseData.message = generateResponseFor.message;
    if (generateResponseFor instanceof ZodError)
      responseData.message = 'Validation failed!';
    responseData.error = generateResponseFor;
    responseData.stack = generateResponseFor?.stack || '';
  } else {
    responseData.message = message;
    responseData.data = generateResponseFor;
  }
  return responseData;
};

export default generateResponse;
