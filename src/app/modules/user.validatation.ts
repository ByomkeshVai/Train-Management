import { z } from 'zod';

const CreatebooksValidation = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  price: z.number(),
});

const UpdatebooksValidation = z.object({
  id: z.number().optional(),
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  price: z.number(),
});

export const booksValidation = {
  CreatebooksValidation,
  UpdatebooksValidation,
};
