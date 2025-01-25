import { AuthRouter } from '../modules/Auth/auth.route';
import TRoutes from './routeTypes';

const apiRoutes: TRoutes = [{ path: '/auth', route: AuthRouter }];

export default apiRoutes;
