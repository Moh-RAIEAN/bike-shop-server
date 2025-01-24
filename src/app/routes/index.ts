import { Router } from 'express';
import asyncRequestHandler from '../middlewares/asyncRequestHndler';
import apiRoutes from './apiRoutes';
const serverApiRoutes: Router = Router();

serverApiRoutes.get(
  '/',
  asyncRequestHandler(async (_, res) => {
    res.json({ ok: true });
  }),
);

apiRoutes.forEach((route) =>
  serverApiRoutes.use(`/api${route.path}`, route.route),
);

export default serverApiRoutes;
