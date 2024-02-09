import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRequest';
import { stationServices } from './station.service';

const createStation = catchAsync(async (req, res) => {
  const result = await stationServices.createStationDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
  });
});

const getAllStations = catchAsync(async (req, res) => {
  const result = await stationServices.getAllStationsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const StationController = {
  createStation,
  getAllStations,
};
