import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import httpStatus from 'http-status';
import Wallet from './wallet.model';

const createWalletIntoDB = async (payload: TUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Check if user_id is present in the payload
    if (!payload?.user_id) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User ID is required');
    }

    // Check if user exists
    const userExists = await User.findOne({ user_id: payload.user_id });
    if (userExists) {
      throw new AppError(409, `User with ${payload.user_id} is already Exists`);
    }

    // Create the user
    const newUser = await User.create([payload], { session });

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Create the wallet
    const newWallet = {
      wallet_id: payload.user_id,
      balance: payload.balance,
      wallet_user: {
        user_id: payload.user_id,
        user_name: payload.user_name,
      },
    };

    const createdWallet = await Wallet.create([newWallet], { session });

    await session.commitTransaction();
    return createdWallet;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User with ${payload.user_id} is already Exists`,
    );
  } finally {
    session.endSession();
  }
};

export const walletService = {
  createWalletIntoDB,
};
