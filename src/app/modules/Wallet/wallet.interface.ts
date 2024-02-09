export interface TWalletUser {
  user_id: number;
  user_name: string;
}

export interface TWallet {
  wallet_id: number;
  balance: number;
  wallet_user: TWalletUser;
}
