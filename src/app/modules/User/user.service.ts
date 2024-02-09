import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import User from './user.model';

const createUserDB = async (payload: TUser) => {
  const { user_id, user_name, balance } = payload;
  const existingUser = await User.findOne({ user_id });
  if (existingUser) {
    throw new AppError(
      httpStatus.CONFLICT,
      `A User with this ${user_id} already exists!`,
    );
  }
  const result = await User.create({ user_id, user_name, balance });
  return result;
};

export const userServices = {
  createUserDB,
};
