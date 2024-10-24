import { IUserOverviewResponse, UserExtracted } from '../types.ts';

export const userOverviewExtractor = (userData: IUserOverviewResponse):UserExtracted => {

  return {
    userPic:userData.userPic,
    firstName:userData.firstName,
    lastName:userData.lastName,
    league:userData.league,
    language:userData.language,
    isBanned:userData.isBanned,
    comment:userData.comment,
    friends:userData.friends,
    isContractor:userData.isContractor
  }

}