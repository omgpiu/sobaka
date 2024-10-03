export interface IUser {
  id: number
  firstName: string
  lastName: string
  balance: number
  repaints: number
  score: null | number
  language: string,
  isPremium: boolean,
  friends: number,
  intro: boolean,
  userPic: string
  league: string
  squad:{
    slug:number
    id:number
  }
  isBanned?:boolean
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

export interface IStar {
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

export interface IUserGoods {
  [key: string]: number;
}

