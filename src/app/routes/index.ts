import { StationRoutes } from './../modules/Station/station.route';
import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { TrainRoutes } from '../modules/Train/train.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/stations',
    route: StationRoutes,
  },
  {
    path: '/trains',
    route: TrainRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
