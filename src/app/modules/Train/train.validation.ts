import { z } from 'zod';

const createTrainStopValidation = z.object({
  station_id: z.number(),
  arrival_time: z.string(),
  departure_time: z.string(),
  fare: z.number(),
});

const CreateTrainValidation = z.object({
  train_id: z.number(),
  train_name: z.string(),
  capacity: z.number(),
  stops: z.array(createTrainStopValidation),
});

export const TrainValidation = {
  CreateTrainValidation,
};
