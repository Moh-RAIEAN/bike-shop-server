import { ZodError } from 'zod';
import { TErrorResponse } from '../interface/error';

const handleZodError = (error: ZodError): TErrorResponse => {
  const errorObj: TErrorResponse = {
    message: 'Validation Failed!',
    errorSources: [],
  };

  const issues = error.issues;
  errorObj.errorSources = issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  return errorObj;
};

export default handleZodError;
