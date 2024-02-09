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

export const walletController = {
  createWallet,
};
