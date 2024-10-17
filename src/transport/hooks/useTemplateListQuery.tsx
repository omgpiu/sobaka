import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { usePagination } from '../../hooks';

export const useTemplateListQuery = () => {
  const apiClient = useApiClient()
  const { limit, offset, updatePagination } = usePagination(20);
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
    limit,
    offset,
    updatePagination
  }
}
