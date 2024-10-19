import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';

export const useTemplateListQuery = (limit:number,offset:number) => {
  const apiClient = useApiClient()
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['templateList', limit, offset],
    queryFn: () => apiClient.getTemplateList({ limit, offset }),
    staleTime: 1000,
    placeholderData: keepPreviousData
  });

  return {
    isSuccess,
    isError,
    isLoading,
    data,
  }
}
