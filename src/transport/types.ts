export interface IPaginationParams {
  limit: number;
  offset: number;
}

type IUserBoostsResponse = {
  [key: string]: number;
};

interface IUserTasksResponse {
  [key: string]: boolean;
}

export interface IUserGoodsResponse {
  [key: string]: number;
}


export interface IUserOverviewResponse {
  "id": number,
  "firstName": string,
  "lastName": string,
  "balance": number,
  "repaints": number,
  "score": null,
  "language": string,
  "isPremium": boolean,
  "friends": number,
  "intro": boolean,
  "userPic": string,
  "league": string,
  "templateId": number,
  "squad": {
    "id": number,
    "name": string,
    "slug": string,
    "logo": string,
    "templateX": number,
    "templateY": number,
    "players": null | number,
    "totalBalance": null | number,
    "totalRepaints": null | number,
    "scoredRepaints": null | number
  },
  "goods": null | IGood,
  "refLimit": number,
  "comment": string,
  "websocketToken": string
  isBanned?: boolean
}

export interface IUserMiningResponse {
  "Username": "",
  "Started": 1728935068,
  "Stopped": 0,
  "Updated": 0,
  "Speed": 9.744,
  "Squad": 573790,
  "ChargeTimer": 1728914253994,
  "RepaintReward": 1,
  UserID: number
  Balance: number
  League: string
  Coins: number;
  Boost: IUserBoostsResponse;
  RepaintsTotal: number;
  Charges: number;
  MaxCharges: number;
  ReChargeSpeed: number;
  Goods: IUserGoodsResponse;
  Tasks: IUserTasksResponse;
}

export interface IAvailableGoodsResponse {
  goodsAvailable: IGood[]
}

interface IGoodPrice {
  currency_id: number;
  currency_name: "NOT" | "TON" | "XTR" | "DOGS"
  price: number;

}


export interface IGood {
  id: number;
  name: string;
  description: string;
  image_url: string;
  prices: IGoodPrice[];
  isOnePiece: boolean;
}


export interface IGoodsExtended extends IGood {
  quantity: number
  price: {
    currency: 'XTR',
    amount: number,
  }
}

export interface ITransaction {
  id: number;
  user_id: number;
  total_amount: number;
  currency: string;
  Good: IGood;
  amount: number;
  status: 'confirmed' | 'pending' | 'refunded' | 'started'
  timestamp: number;
  signature: string;
  tg_pay_charge_id: string;
}

export interface ITransactionResponse {
  payments: Record<string, ITransaction>
}

export interface IWebThree {
  amount: number;
  currency: string;
  id: number;
  userId: number;
  walletFrom: string;
  status: string;
  onChainHash: string;
  dttmStart: number;
  quantity: number
  goodId: number
  goodName: string
}

export interface IWebThreeResponse {
  payments: Record<string, IWebThree>
}

export type UserExtracted = Pick<IUserOverviewResponse, 'userPic' | 'firstName' | 'lastName' | 'league' | 'isBanned' | 'comment' | 'language' | 'friends'>
export type IUser = Omit<IUserMiningResponse, 'Tasks' | 'Boost'> & UserExtracted

export interface ITask {
  id: string,
  name: string,
  value: boolean
}

export interface IBoost {
  id: string,
  name: string,
  value: number
}


export interface IParamsAddGoods {
  userId: IUser['UserID']
  goods: {
    id: IGood['id']
    name: IGood['name']
    quantity: number
  }
}


export interface ITemplate {
  templateId: string,
  url: string,
  subscribers: number
}

export type ITemplateListResponse = ITemplate[]
