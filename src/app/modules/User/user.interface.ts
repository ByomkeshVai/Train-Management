import { Model } from 'mongoose';

export interface TUser {
  user_id: number;
  username: string;
  balance: number;
}

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistsByCustomId(user_id: string): Promise<TUser>;
}
