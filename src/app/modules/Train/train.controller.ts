import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRequest';
import { trainServices } from './train.service';

const createTrain = catchAsync(async (req, res) => {
  const result = await trainServices.createTrainDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
  });
});

export const TrainController = {
  createTrain,
};
