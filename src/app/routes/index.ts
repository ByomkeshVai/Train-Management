import { StationRoute } from './../modules/Station/station.route';
import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/stations',
    route: StationRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;