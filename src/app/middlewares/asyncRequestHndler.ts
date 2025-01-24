import { RequestHandler } from 'express';

const asyncRequestHandler = (
  requestHandler: RequestHandler,
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncRequestHandler;
