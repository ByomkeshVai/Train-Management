import { Model } from 'mongoose';

export interface TStop {
  station_id: number;
  arrival_time: string | null;
  departure_time: string | null;
  fare: number;
}

export interface TTrain {
  train_id: number;
  train_name: string;
  capacity: number;
  stops: [TStop];
}

export interface TrainModel extends Model<TTrain> {
  // eslint-disable-next-line no-unused-vars
  isTrainExistsByCustomId(train_id: number): Promise<TTrain>;
}
