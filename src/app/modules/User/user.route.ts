import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UsersValidation } from './user.validatation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
  '/users',
  validateRequest(UsersValidation.CreateUsersValidation),
  UserController.createUser,
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
