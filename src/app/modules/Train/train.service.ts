import Train from './train.model';
import { TTrain, TrainResponse } from './train.interface';
import moment from 'moment';
import AppError from '../../errors/AppError';

const createTrainDB = async (payload: TTrain): Promise<TrainResponse> => {
  const userExists = await Train.findOne({ train_id: payload.train_id });
  if (userExists) {
    throw new AppError(409, `Train with ${payload.train_id} is already Exists`);
  }
  const result = await Train.create(payload);

  const aggregationPipeline = [
    { $match: { train_id: result.train_id } },
    { $unwind: '$stops' },
    {
      $group: {
        _id: '$train_id',
        service_start: { $min: '$stops.arrival_time' },
        service_ends: { $max: '$stops.departure_time' },
        num_stations: { $sum: 1 },
      },
    },
  ];

  const aggregationResult = await Train.aggregate(aggregationPipeline);

  const serviceStart = isValidTime(aggregationResult[0]?.service_start)
    ? formatTime(aggregationResult[0]?.service_start)
    : null;

  const serviceEnds = isValidTime(aggregationResult[0]?.service_ends)
    ? formatTime(aggregationResult[0]?.service_ends)
    : null;

  const response: TrainResponse = {
    train_id: result.train_id,
    train_name: result.train_name,
    capacity: result.capacity,
    service_start: serviceStart,
    service_ends: serviceEnds,
    num_stations: aggregationResult[0]?.num_stations || 0,
  };

  return response;
};

export const trainServices = {
  createTrainDB,
};

// Function to check if a time string is valid
function isValidTime(time: string | undefined): boolean {
  return typeof time === 'string' && /^[0-9]{2}:[0-9]{2}$/.test(time);
}

// Function to format time string
function formatTime(time: string): string {
  return moment(time, 'HH:mm').format('HH:mm');
}
