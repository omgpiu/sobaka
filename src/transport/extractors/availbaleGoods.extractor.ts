import {  IAvailableGoodsResponse } from '../types.ts';

export const availableGoodsExtractor = (data:IAvailableGoodsResponse)=>{
  return data.goodsAvailable ?? []
}