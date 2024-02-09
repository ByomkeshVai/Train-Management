import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRequest';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
  });
});

// const updateBook = catchAsync(async (req, res) => {
//   const bookId = req.params.bookId;
//   const result = await bookServices.updateBookIntoDB(bookId, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     books: result,
//   });
// });

// const getSingleBook = catchAsync(async (req, res) => {
//   const bookId = req.params.bookId;
//   const result = await bookServices.getSingleBookFromDB(bookId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     books: result,
//   });
// });

// const getAllBooks = catchAsync(async (req, res) => {
//   const result = await bookServices.getAllBooksFromDB(req.query);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     books: result,
//   });
// });

export const UserController = {
  createUser,
  // updateBook,
  // getSingleBook,
  // getAllBooks,
};
