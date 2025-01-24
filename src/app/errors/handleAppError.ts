import { TErrorResponse } from '../interface/error';
import AppError from './AppError';

const handleAppError = (error: AppError): TErrorResponse => {
  const errorObj: TErrorResponse = {
    message: error.message,
    errorSources: error.errorSources || [],
  };
  if (error?.statusCode) errorObj.statusCode = error?.statusCode;
  return errorObj;
};

export default handleAppError;
