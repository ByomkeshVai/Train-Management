import { Model } from 'mongoose';

export interface TStation {
  station_id: number;
  station_name: string;
  longitude: number;
  latitude: number;
}

export interface StationModel extends Model<TStation> {
  // eslint-disable-next-line no-unused-vars
  isStationExistsByCustomId(station_id: number): Promise<TStation>;
}
