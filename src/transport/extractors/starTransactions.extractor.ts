import { ITransactionResponse } from '../types.ts';

export const  starTransactionExtractor=(payments:ITransactionResponse['payments']) =>{
  return Object.keys(payments).map(key => {
    return {
      ...payments[key],
    };
  });
}