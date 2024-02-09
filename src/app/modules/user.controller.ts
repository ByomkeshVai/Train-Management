import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { bookServices } from "./user.service";


const createCalculation = catchAsync(async (req, res) => {
    const result = await bookServices.createBooks(req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: 201,
      books: result,
    });
  });

  const updateBook = catchAsync(async (req, res) => {
    const bookId = req.params.bookId;
    const result = await bookServices.updateBookIntoDB(bookId, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      books: result,
    });
  });


  const getSingleBook = catchAsync(async (req, res) => {
    const bookId = req.params.bookId;
    const result = await bookServices.getSingleBookFromDB(bookId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      books: result,
    });
  });

  const getAllBooks = catchAsync(async (req, res) => {
    const result = await bookServices.getAllBooksFromDB(req.query);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      books: result,
    });
  });

  export const BooksController = {
    createCalculation,
    updateBook,
    getSingleBook,
    getAllBooks
  };
  