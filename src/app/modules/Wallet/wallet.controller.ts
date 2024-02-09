import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRequest';
import { walletService } from './wallet.service';

const createWallet = catchAsync(async (req, res) => {
  const result = await walletService.createWalletIntoDB(req.body);

  const responseData = {
    user_id: result[0]?.wallet_id,
    user_name: result[0]?.wallet_user?.user_name,
    balance: result[0]?.balance,
  };

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: responseData,
  });
});

const getSingleWallet = catchAsync(async (req, res) => {
  const walletId = req.params.walletId;
  const result = await walletService.getSingleWalletFromDB(walletId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const rechargeWallet = catchAsync(async (req, res) => {
  const { wallet_id } = req.params;
  const { recharge } = req.body;
  const result = await walletService.getRechargeDB(wallet_id, recharge);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const walletController = {
  createWallet,
  getSingleWallet,
  rechargeWallet,
};
