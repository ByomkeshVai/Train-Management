import { Schema, model } from 'mongoose';
import { TWallet, TWalletUser } from './wallet.interface';

const walletUserSchema = new Schema<TWalletUser>({
  user_id: {
    type: Number,
  },
  user_name: {
    type: String,
  },
});

const walletSchema = new Schema<TWallet>(
  {
    wallet_id: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    wallet_user: {
      type: walletUserSchema,
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

const Wallet = model<TWallet>('Wallet', walletSchema);

export default Wallet;
