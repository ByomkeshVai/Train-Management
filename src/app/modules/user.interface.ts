import { Model } from 'mongoose';

export interface TUser {
  user_id: number;
  username: string;
  balance: number;
}

export interface BookModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isBooksExistsByCustomId(user_id: string): Promise<TBooks>;
}
