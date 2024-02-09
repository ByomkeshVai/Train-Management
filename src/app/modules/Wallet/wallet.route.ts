import express from 'express';
import { walletController } from '../Wallet/wallet.controller';

const router = express.Router();

router.get('/:walletId', walletController.getSingleWallet);

router.put('/:wallet_id', walletController.rechargeWallet);

export const WalletRoutes = router;
