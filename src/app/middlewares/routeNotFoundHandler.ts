import catchAsync from './asyncRequestHndler';

const routeNotFoundHandler = () =>
  catchAsync(async (_, res) => {
    res.status(404).json({ status: 404, message: 'requested url not found!' });
  });

export default routeNotFoundHandler;
