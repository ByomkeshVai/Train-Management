import { model, Schema } from 'mongoose';
import { TrainModel, TStop, TTrain } from './train.interface';

const stopTrainSchema = new Schema<TStop>(
  {
    station_id: {
      type: Number,
      ref: 'Station',
      required: [true, 'station id is required'],
    },
    arrival_time: {
      type: String,
      default: null,
    },
    departure_time: {
      type: String,
      default: null,
    },
    fare: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  },
);

const trainSchema = new Schema<TTrain, TrainModel>(
  {
    train_id: {
      type: Number,
      required: [true, 'train id is required'],
      unique: true,
    },
    train_name: {
      type: String,
      required: [true, 'train name is required'],
    },
    capacity: {
      type: Number,
      required: [true, 'capacity is required'],
    },
    stops: [stopTrainSchema],
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

trainSchema.statics.isTrainExistsByCustomId = async function (
  train_id: number,
) {
  return await this.findOne({ train_id });
};

const Train = model<TTrain, TrainModel>('Train', trainSchema);

export default Train;
