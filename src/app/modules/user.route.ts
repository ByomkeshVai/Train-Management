import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { booksValidation } from './user.validatation';
import { BooksController } from './books.controller';

const router = express.Router();

router.post(
  '/books',
  validateRequest(booksValidation.CreatebooksValidation),
  BooksController.createCalculation,
);

router.put(
  '/books/:bookId',
  validateRequest(booksValidation.UpdatebooksValidation),
  BooksController.updateBook,
);


router.get(
  '/books/:bookId',
  BooksController.getSingleBook,
);

router.get(
  '/books',
  BooksController.getAllBooks,
);




export const BooksRoute = router;