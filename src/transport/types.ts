type IUserBoostsResponse = {
  [key: string]: number;
};

interface IUserTasksResponse {
  [key: string]: boolean;
}

export interface IUserGoodsResponse {
  [key: string]: number;
}


export interface IUserResponse {
  UserID: number
  FirstName: string
  LastName: string
  Balance: number
  Repaints: number
  Score: null | number
  Language: string,
  IsPremium: boolean,
  Friends: number,
  Intro: boolean,
  UserPic: string
  League: string
  Squad: {
    slug: number
    id: number
  }
  IsBanned?: boolean
  Coins: number;
  SpeedPerSecond: number;
  FromStart: number;
  FromUpdate: number;
  MaxMiningTime: number;
  Claimed: number;
  Boost: IUserBoostsResponse;
  RepaintsTotal: number;
  UserBalance: number;
  Activated: boolean;
  Charges: number;
  MaxCharges: number;
  ReChargeTimer: number;
  ReChargeSpeed: number;
  Goods: IUserGoodsResponse;
  Tasks: IUserTasksResponse;
}

export interface IAvailableGoodsResponse{
  goodsAvailable:{
    [key: string]:IGood
  }
}

export interface IGood {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  currency: string;
  isOnePiece: boolean;
}

export interface ITransaction {
  id: number;
  user_id: number;
  total_amount: number;
  currency: string;
  Good: IGood;
  amount: number;
  status: string;
  timestamp: number;
  signature: string;
  tg_pay_charge_id: string;
}


export interface IWebThree {
  amount: number;
  currency: string;
  id: number;
  userId: number;
  walletFrom: string;
  status: string;
  onChainHash: string;
  dtmStart: number;
}


export type IUser = Omit<IUserResponse, 'Tasks' | 'Boost'>

export interface ITask { id: string, name: string, value: boolean }
export interface IBoost { id: string, name: string, value: number }
