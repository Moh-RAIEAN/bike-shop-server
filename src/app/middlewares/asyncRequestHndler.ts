import { RequestHandler } from 'express';

const catchAsync = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
