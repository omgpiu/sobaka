import {  IAvailableGoodsResponse } from '../types.ts';

export const availableGoodsExtractor = (data:IAvailableGoodsResponse)=>{
  const goodsArray = Object.values(data.goodsAvailable).map(({ id, name }) => ({ id, name }));

  return {
    availableGoods:data.goodsAvailable ?? {},
    goodsArray
  }

}