import { z } from 'zod';

const CreateUsersValidation = z.object({
  user_id: z.number(),
  username: z.string(),
  balance: z.number(),
});

// const UpdateUsersValidation = z.object({
//   id: z.number().optional(),
//   title: z.string(),
//   author: z.string(),
//   genre: z.string(),
//   price: z.number(),
// });

export const UsersValidation = {
  CreateUsersValidation,
};
