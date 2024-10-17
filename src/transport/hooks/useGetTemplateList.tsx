import { useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useState } from 'react';


export const useGetTemplateList = () => {
  const apiClient = useApiClient()

  const [userId, setUserId] = useState<string | null>(null);

  const {data, isError, isLoading, isSuccess} = useQuery({
    queryKey: ['templateList'],
    queryFn: () => apiClient!.getTemplateList(),
    enabled: Boolean(userId),
    staleTime: 1000,
  });

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
    isError,
    isLoading,
    data,
    getAvailableGoods: handleClick
  }
}
