import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UsersValidation } from './user.validatation';
import { walletController } from '../Wallet/wallet.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(UsersValidation.CreateUsersValidation),
  walletController.createWallet,
);

export const UserRoutes = router;
