import { z } from 'zod';

const WalletUserSchema = z.object({
  user_id: z.number(),
  user_name: z.string(),
});

export const WalletSchema = z.object({
  wallet_id: z.number(),
  balance: z.number(),
  wallet_user: WalletUserSchema,
});
