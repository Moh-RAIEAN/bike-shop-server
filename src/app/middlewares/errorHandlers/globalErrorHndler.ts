import { ErrorRequestHandler } from 'express';
import generateResponse from '../../../helpers/generateResponse';

export default function (): ErrorRequestHandler {
  return (error, _, res, next) => {
    if (res.headersSent) next(error);
    res.send(generateResponse({ generateResponseFor: error }));
  };
}
