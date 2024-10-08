import { useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';


export const useGetUserInfoQuery = () => {
  const apiClient = useApiClient()

  const [userId, setUserId] = useState<string | null>(null);
  const {data: userData, isError, isLoading, isSuccess,refetch:refetchUser} = useQuery({
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

  const {
    data: stars,
    isError: isStarsError,
    isLoading: isStarsLoading,
  } = useQuery({
    queryKey: ['stars'],
    queryFn: () => apiClient.getStars(userId!),
    enabled: Boolean(userId),
    staleTime: 1000,
  });


  const userGoods = useMemo(() => {
    if (!userData?.user.Goods || !goodsData || !goodsData.availableGoods) return []
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
  }, [goodsData, userData?.user.Goods])

  const handleClick = (id: string) => {
    setUserId(id);
  };

  useEffect(() => {
    if(userId){
      refetchUser()
    }
  }, [userId]);

  useEffect(() => {
    if(isError){
      message.error('Ошибка с данными юзера, проверь айди')
    }
    if(isErrorGoods){
      message.error('Ошибка с получением мапы гудсов')
    }
    if(isStarsError) {
      message.error('Ошибка с получением старс транзакций')
    }

  }, [isError,isErrorGoods,isStarsError]);

  return {
    isSuccess,
    isError: isError || isErrorGoods || isStarsError,
    isLoading: isLoading || isGoodsLoading || isStarsLoading,
    userData: userData,
    goods: {
      goodsArray: goodsData?.goodsArray,
      userGoods: userGoods
    },
    stars,
    getUserData: handleClick,
  }
}
