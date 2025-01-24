import asyncRequestHandler from './asyncRequestHndler';

const routeNotFoundHandler = () =>
  asyncRequestHandler(async (_, res) => {
    res.status(404).json({ status: 404, message: 'requested url not found!' });
  });

export default routeNotFoundHandler;
