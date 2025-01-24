/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse } from '../interface/error';

const handleDuplicateKeyError = (error: any): TErrorResponse => {
  const [path, value] = Object.entries(error.keyValue)[0];
  const errorObj = {
    message: `value:- \`${value}\` is already exists.`,
    errorSources: [
      { path: path, message: `value \`${value}\` is already in use` },
    ],
  };
  return errorObj;
};

export default handleDuplicateKeyError;
