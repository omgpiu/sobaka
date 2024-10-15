import { IWebThree, IWebThreeResponse } from '../types';

export const web3TransactionsExtractor = (data: IWebThreeResponse):IWebThree[] => {
  return Object.values(data.payments)
}