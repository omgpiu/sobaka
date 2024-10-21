import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { usePagination } from '../../hooks';


export const useStarsTransactionsQuery = () => {
  const apiClient = useApiClient()
  const { limit, offset, updatePagination } = usePagination(20);
  const [ userId, setUserId ] = useState<string | null>(null);
  const {
    data: stars,
    isError,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [ 'stars', limit, offset ],
    queryFn: () => apiClient.getStars({ userId: userId!, limit, offset }),
    enabled: Boolean(userId),
    placeholderData: keepPreviousData
  });


  const handleRetry = () => {
    //@ts-ignore
    if (error?.response?.status === 500) {
      refetch();
    }
  };

  const handleClick = (id: string) => {
    setUserId(id);
    if (isError) {
      handleRetry()
    }

  };

  useEffect(() => {
    if (userId) {
      refetch()
    }
  }, [ userId ]);

  useEffect(() => {
    if (isError) {
      message.error('Ошибка с получением stars транзакций')
    }

  }, [ isError ]);

  return {
    isError,
    isLoading,
    dataSource: stars,
    getStarsTrans: handleClick,
    starsLimit: limit,
    starsOffset: offset,
    updateStarsPagination: updatePagination,
  }
}
