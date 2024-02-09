import { Response } from 'express';



type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: any;
  books: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => { 
    res.status(data?.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        books: data.books
    })
}

export default sendResponse