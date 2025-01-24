import { Router } from 'express';
import catchAsync from '../middlewares/asyncRequestHndler';
import apiRoutes from './apiRoutes';
const serverApiRoutes: Router = Router();

serverApiRoutes.get(
  '/',
  catchAsync(async (_, res) => {
    res.json({ ok: true });
  }),
);

apiRoutes.forEach((route) =>
  serverApiRoutes.use(`/api${route.path}`, route.route),
);

export default serverApiRoutes;
