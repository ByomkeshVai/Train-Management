import { model, Schema } from 'mongoose';
import { StationModel, TStation } from './station.interface';

const stationSchema = new Schema<TStation, StationModel>(
  {
    station_id: {
      type: Number,
      required: [true, 'station id is required'],
      unique: true,
    },
    station_name: {
      type: String,
      required: [true, 'station name is required'],
    },
    longitude: {
      type: Number,
      required: [true, 'longitude is required'],
    },
    latitude: {
      type: Number,
      required: [true, 'latitude is required'],
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        // eslint-disable-next-line no-self-assign
        ret.id = ret.id;
        delete ret._id;
      },
    },
  },
);

stationSchema.statics.isStationExistsByCustomId = async function (
  station_id: number,
) {
  return await Station.findOne({ station_id });
};

const Station = model<TStation, StationModel>('Station', stationSchema);

export default Station;
