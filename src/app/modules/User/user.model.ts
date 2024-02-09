import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    user_id: {
      type: Number,
      required: [true, 'User Id is required'],
      unique: true,
    },
    user_name: {
      type: String,
      required: [true, 'username is required'],
    },
    balance: {
      type: Number,
      required: [true, 'balance is required'],
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

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

const User = model<TUser, UserModel>('User', userSchema);

export default User;
