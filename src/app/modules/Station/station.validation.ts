import { z } from 'zod';

const CreateStationValidation = z.object({
  station_id: z.number(),
  station_name: z.string(),
  longitude: z.number(),
  latitude: z.number(),
});

export const stationValidation = {
  CreateStationValidation,
};
