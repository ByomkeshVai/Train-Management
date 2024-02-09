import httpStatus from 'http-status';
import { TStation } from './station.interface';
import Station from './station.model';
import AppError from '../../errors/AppError';

const createStationDB = async (payload: TStation) => {
  const { station_id, station_name, latitude, longitude } = payload;
  const existingStation = await Station.findOne({ station_id });
  if (existingStation) {
    throw new AppError(
      httpStatus.CONFLICT,
      `A Station with this ${station_id} already exists!`,
    );
  }
  const result = await Station.create({
    station_id,
    station_name,
    latitude,
    longitude,
  });
  return result;
};

export const stationServices = {
  createStationDB,
  // updateBookIntoDB,
  // getSingleBookFromDB,
  // getAllBooksFromDB,
};
