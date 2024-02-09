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

const getSingleWalletFromDB = async (walletId: string) => {
  try {
    const wallet = await Wallet.find({ wallet_id: walletId });

    if (!wallet || wallet.length === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Wallet with ${walletId} is not found`,
      );
    }

    return wallet;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getRechargeDB = async (wallet_id: string, recharge: number) => {
  try {
    const wallet = await Wallet.findOne({ wallet_id });

    if (!wallet) {
      throw new AppError(404, `Wallet with ${wallet_id} is not found`);
    }

    // Validate recharge amount
    if (recharge < 100 || recharge > 10000) {
      throw new AppError(
        400,
        'Recharge amount must be between 100 and 10000 Taka',
      );
    }

    // Add funds to the wallet
    wallet.balance += recharge;
    await wallet.save();

    return wallet;
  } catch (error: any) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const walletService = {
  createWalletIntoDB,
  getSingleWalletFromDB,
  getRechargeDB,
};
