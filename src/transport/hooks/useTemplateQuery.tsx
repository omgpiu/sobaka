import { useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useState } from 'react';


export const useTemplateQuery = () => {
  const apiClient = useApiClient()

  const [templateId, setTemplateId] = useState< null | string >(null);

  const {data, isError, isLoading, isSuccess} = useQuery({
    queryKey: ['templateSingle'],
    queryFn: () => apiClient.getTemplate(templateId!),
    enabled: Boolean(templateId),
    staleTime: 1000,
  });

  useEffect(() => {
    if (isSuccess) {
      setTemplateId(null)
    }
  }, [isSuccess])

  const handleClick = (templateId: string) => {
    setTemplateId(templateId);
  };

  return {
    isSuccess,
    isError,
    isLoading,
    data,
    getSingleTemplate: handleClick
  }
}
