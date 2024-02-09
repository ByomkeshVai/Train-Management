import { model, Schema } from "mongoose";
import { BookModel, TBooks } from "./books.interface";

const bookSchema = new Schema<TBooks, BookModel>(
    {
        id: {
            type: Number,
            required: [true, 'Id is required'],
            unique: true,
        },
        title: {
            type:  String,
            required: [true, 'Title is required'],
        },
        author: {
            type:  String,
            required: [true, 'author is required'],
        },
        genre: {
            type:  String,
            required: [true, 'genre is required'],
        },
        price: {
            type:  Number,
            required: [true, 'Title is required'],
        },
    },
    {
        versionKey: false,
        toJSON: {
            transform: function (doc, ret) {
                // eslint-disable-next-line no-self-assign
                ret.id = ret.id;
                delete ret._id;
            },
        },
    }
)


bookSchema.statics.isBooksExistsByCustomId = async function (id: string) {
    return await Book.findOne({ id });
  };


const Book = model<TBooks, BookModel>('Book', bookSchema);

export default Book;