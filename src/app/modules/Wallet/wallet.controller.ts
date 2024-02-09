import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRequest';
import { walletService } from './wallet.service';

const createWallet = catchAsync(async (req, res) => {
  const result = await walletService.createWalletIntoDB(req.body);

  // Extract necessary fields from the result object
  const responseData = {
    user_id: result[0]?.wallet_id,
    user_name: result[0]?.wallet_user?.user_name,
    balance: result[0]?.balance,
  };

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: responseData, // Send the extracted data in the response
  });
});

export const walletController = {
  createWallet,
};
