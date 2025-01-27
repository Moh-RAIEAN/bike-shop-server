import { AdminRouter } from '../modules/Admin/admin.routes';
import { AuthRouter } from '../modules/Auth/auth.route';
import { UserRouter } from '../modules/User/user.routes';
import TRoutes from './routeTypes';

const apiRoutes: TRoutes = [
  { path: '/auth', route: AuthRouter },
  { path: '/users', route: UserRouter },
  { path: '/admin', route: AdminRouter },
];

export default apiRoutes;
