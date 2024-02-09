import { StationRoutes } from './../modules/Station/station.route';
import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { TrainRoutes } from '../modules/Train/train.route';
import { WalletRoutes } from '../modules/Wallet/wallet.route';
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
  {
    path: '/wallets',
    route: WalletRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
