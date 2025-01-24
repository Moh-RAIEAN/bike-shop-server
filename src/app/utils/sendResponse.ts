import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { TErrorSources } from '../interface/error';

export type TResponse<T, M> = {
  statusCode?: number;
  success?: boolean;
  message?: string;
  meta?: M;
  data?: T;
  errorSource?: TErrorSources;
  stack?: string;
};

export const sendResponse = <T, M>(
  response: Response,
  responseData: TResponse<T, M>,
): void => {
  const responseObj: TResponse<T, M> = {
    statusCode: responseData?.statusCode || StatusCodes.OK,
    success: responseData?.success || true,
    message: responseData?.message || '',
  };

  if (responseData?.meta) responseObj.meta = responseData?.meta;
  if (responseData?.data) responseObj.data = responseData?.data;
  if (responseData?.errorSource) {
    responseObj.success = false;
    responseObj.errorSource = responseData?.errorSource;
    responseObj.stack = responseData?.stack;
  }

  response.status(Number(responseObj.statusCode)).json(responseObj);
};

export default sendResponse;
