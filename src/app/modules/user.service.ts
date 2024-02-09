import httpStatus from "http-status";
import { TBooks } from "./books.interface";
import Book from "./user.model";
import AppError from "../errors/AppError";

const createBooks = async (payload: TBooks) => {
  const { id, title, author, genre, price } = payload;
  const existingBook = await Book.findOne({ id });
  if (existingBook) {
      throw new AppError(httpStatus.CONFLICT, 'A book with this ID already exists!');
  }
  const result = await Book.create({ id, title, author, genre, price });
  return result;
};


  const updateBookIntoDB = async (bookId: string, Payload:  Partial<TBooks>) => {

    const isBookExist = await Book.isBooksExistsByCustomId(bookId);

    if (!isBookExist) {
      throw new AppError(httpStatus.NOT_FOUND, `book with id: ${bookId} was not found !`);
    }

    const updateBasicInfo = await Book.findOneAndUpdate({id: bookId}, Payload, {
      new: true,
      runValidators: true,
    });
  
    if (!updateBasicInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Book!');
    }
  
    return updateBasicInfo;
  };




  const getSingleBookFromDB = async (bookId: string) => {
    try {
      const bookFind = await Book.findOne({id: bookId});
  
      if (!bookFind) {
        throw new AppError(httpStatus.NOT_FOUND, `"book with id: ${bookId} was not found !`);
      }
  
      return bookFind;
    } catch (error: any) {
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }
  };



  const getAllBooksFromDB = async (query: Record<string, unknown>) => {
    try {
        const { title, author, genre, price, sort, order } = query;

        const filter: Record<string, unknown> = {};
        if (title) filter.title = title;
        if (author) filter.author = author;
        if (genre) filter.genre = genre;
        if (price) filter.price = price;

        const sortOptions: { [key: string]: any } = {};
        if (sort) sortOptions[sort as string] = order === 'DESC' ? -1 : 1;
        if (!sort && !order) {
            sortOptions['id'] = 1;
        }

        const result = await Book.find(filter).sort(sortOptions);

        return result;
    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }
};

  

  export const bookServices = {
    createBooks,
    updateBookIntoDB,
    getSingleBookFromDB,
    getAllBooksFromDB,
  };
  