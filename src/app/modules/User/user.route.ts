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

// router.put(
//   '/books/:bookId',
//   validateRequest(booksValidation.UpdatebooksValidation),
//   BooksController.updateBook,
// );

// router.get(
//   '/books/:bookId',
//   BooksController.getSingleBook,
// );

// router.get(
//   '/books',
//   BooksController.getAllBooks,
// );

export const UserRoutes = router;
