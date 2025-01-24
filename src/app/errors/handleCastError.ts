import mongoose from 'mongoose';
import { TErrorResponse } from '../interface/error';

const handleCastError = (error: mongoose.Error.CastError): TErrorResponse => {
  const errorObj = { message: '', errorSources: [] };
  errorObj.message = `in valid ${error.kind}`;

  return {
    ...errorObj,
    errorSources: [
      {
        path: error.path,
        message: `\`${error.value}\` is not a valid ${error.path}`,
      },
    ],
  };
};

export default handleCastError;
