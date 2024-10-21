import { useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
import { IGoodsExtended, IUser } from '../types.ts';


export const useUserInfoQuery = () => {
  const apiClient = useApiClient()

  const [ userId, setUserId ] = useState<string | null>(null);
  const { data: userData, isError, isLoading, isSuccess, refetch: refetchUser, error: userError } = useQuery({
    queryKey: [ 'user' ],
    queryFn: async () => {
      const [ userMiningData, userData ] = await Promise.all([
        apiClient.getUserMining(userId!),
        apiClient.getUser(userId!)
      ]);

      return {
        boostsArray: userMiningData!.boostsArray,
        tasksArray: userMiningData!.tasksArray,
        user: {
          ...userData,
          ...userMiningData!.user
        } as IUser


      }
    },
    enabled: Boolean(userId),
    staleTime: 1000,
  });

  const {
    data: goodsData,
    isError: isErrorGoods,
    isLoading: isGoodsLoading,
    error: goodsError,
    refetch: refetchGoods
  } = useQuery({
    queryKey: [ 'availableGoods' ],
    queryFn: () => apiClient.getAvailableGoods(),
    enabled: Boolean(userId),
    staleTime: 60000,
  });



  const userGoods = useMemo<IGoodsExtended[]>(() => {
    if (!userData?.user || !userData?.user.Goods || !goodsData) return [];

    return goodsData
      .filter(good => userData.user.Goods[good.id])
      .map(good => {
        const priceXTR = good.prices.find(price => price.currency_name === 'XTR')?.price ?? 0;

        return {
          ...good,
          quantity: userData.user.Goods[good.id],
          price: {
            currency: 'XTR',
            amount: priceXTR,
          }
        };
      });
  }, [ goodsData, userData?.user.Goods ]);


  const handleRetry = () => {

    //@ts-ignore
    if (userError?.response?.status === 500 || userError?.response?.status === 401) {
      refetchUser();
    }

    //@ts-ignore
    if (goodsError?.response?.status === 500 || goodsError?.response?.status === 401) {
      refetchGoods();
    }

  };

  const handleClick = (id: string) => {
    setUserId(id);
    if (userError || goodsError) {
      handleRetry()
    }

  };

  useEffect(() => {
    if (userId) {
      refetchUser()
    }
  }, [ userId ]);

  useEffect(() => {
    if (isError) {
      message.error('Ошибка с данными юзера, проверь айди')
    }
    if (isErrorGoods) {
      message.error('Ошибка с получением мапы гудсов')
    }


  }, [ isError, isErrorGoods ]);

  return {
    isSuccess,
    isError: isError || isErrorGoods,
    isLoading: isLoading || isGoodsLoading,
    userData: userData,
    goods: {
      goodsArray: goodsData,
      userGoods: userGoods
    },
    getUserData: handleClick,
  }
}
