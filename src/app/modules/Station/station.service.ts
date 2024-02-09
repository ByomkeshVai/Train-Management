import httpStatus from 'http-status';
import { TStation } from './station.interface';
import Station from './station.model';
import AppError from '../../errors/AppError';
import Train from '../Train/train.model';

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

const getAllStationsFromDB = async () => {
  try {
    const result = await Station.find({});
    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getSingleStationFromDB = async (stationId: string) => {
  try {
    const trains = await Train.find({
      'stops.station_id': parseInt(stationId),
    });

    if (!trains || trains.length === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Trains with ${stationId} is not found `,
      );
    }

    const response = {
      station_id: stationId,
      trains: trains.map((train) => ({
        train_id: train.train_id,
        arrival_time:
          train.stops.find((stop) => stop.station_id === parseInt(stationId))
            ?.arrival_time || '',
        departure_time:
          train.stops.find((stop) => stop.station_id === parseInt(stationId))
            ?.departure_time || '',
      })),
    };

    return response;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const stationServices = {
  createStationDB,
  getAllStationsFromDB,
  getSingleStationFromDB,
  // getAllBooksFromDB,
};
