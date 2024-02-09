import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Train from './train.model';
import { TTrain } from './train.interface';

const createTrainDB = async (payload: TTrain) => {
  console.log(payload);
  const result = await Train.create(payload);
  const existingTrain = await Train.findOne({ train_id: payload.train_id });
  if (existingTrain) {
    throw new AppError(
      httpStatus.CONFLICT,
      `A Train with this ${payload.train_id} already exists!`,
    );
  }

  // const existingStation = await Train.findOne({ stops.sation_id: payload.train_id });
  // if (existingStation) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     `A Station with this ${payload.stops.station_id} not exists!`,
  //   );
  // }

  return result;
};

export const trainServices = {
  createTrainDB,
  // updateBookIntoDB,
  // getSingleBookFromDB,
  // getAllBooksFromDB,
};
