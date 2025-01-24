import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHndler from './app/middlewares/errorHandlers/globalErrorHndler';
import routeNotFoundHandler from './app/middlewares/routeNotFoundHandler';
import serverApiRoutes from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', serverApiRoutes);
app.use(routeNotFoundHandler());
app.use(globalErrorHndler());

export default app;
