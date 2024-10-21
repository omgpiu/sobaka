import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { usePagination } from '../../hooks';


export const useWeb3TransactionsQuery = () => {
  const apiClient = useApiClient()
  const { limit, offset, updatePagination } = usePagination(20);
  const [ userId, setUserId ] = useState<string | null>(null);
  const {
    data: web3,
    isError,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [ 'web3',limit,offset ],
    queryFn: () => apiClient.getWebThreeTransactions({ userId: userId!, limit, offset }),
    enabled: Boolean(userId),
    staleTime: 1000,
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
      message.error('Ошибка с получением web3 транзакций')
    }

  }, [ isError ]);

  return {
    isError,
    isLoading,
    dataSource: web3,
    getWeb3Trans: handleClick,
    web3Limit: limit,
    web3Offset: offset,
    updateWeb3Pagination: updatePagination,
  }
}
