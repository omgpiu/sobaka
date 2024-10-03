import { useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useMemo, useState } from 'react';


export const useGetUserQuery = () => {
  const apiClient = useApiClient()

  const [userId, setUserId] = useState<string | null>(null);

  const {data:userData, isError, isLoading, isSuccess} = useQuery({
    queryKey: ['user'],
    queryFn: () => apiClient.getUserMining(userId!),
    enabled: Boolean(userId),
    staleTime: 1000,
  });

  const {data: goodsData, isError: isErrorGoods, isLoading: isGoodsLoading} = useQuery({
    queryKey: ['availableGoods'],
    queryFn: () => apiClient.getAvailableGoods(),
    enabled: Boolean(userId),
    staleTime: 60000,
  });

  const userGoods = useMemo(()=>{
    if(!userData?.user.Goods || !goodsData || !goodsData.availableGoods) return []
    const result = [];

    for (const [id, count] of Object.entries(userData?.user.Goods)) {
      const goodId = Number(id);
      const good = goodsData.availableGoods[goodId];

      if (good) {
        for (let i = 0; i < count; i++) {
          result.push({
            ...good,
            inner_id: `${good.id}`.repeat(i + 1),
          });
        }
      }
    }
    return result
  },[goodsData,userData?.user])



  useEffect(() => {
    if (isSuccess) {
      setUserId(null)
    }
  }, [isSuccess])

  const handleClick = (id: string) => {
    setUserId(id);
  };

  return {
    isSuccess,
    isError: isError || isErrorGoods,
    isLoading: isLoading || isGoodsLoading,
    userData: userData,
    goods:{
      goodsArray:goodsData?.goodsArray,
      userGoods:userGoods
    },
    getUser: handleClick
  }
}
