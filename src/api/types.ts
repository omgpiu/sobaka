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
}


