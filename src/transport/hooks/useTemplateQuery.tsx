import { useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useState } from 'react';
import { ISingleTemplate } from '../types.ts';


export const useTemplateQuery = () => {
  const apiClient = useApiClient()

  const [templateId, setTemplateId] = useState< null | string >(null);

  const {data, isError, isLoading, isSuccess,refetch} = useQuery({
    queryKey: ['templateSingle'],
    queryFn: () => apiClient.getTemplate(templateId!),
    enabled: Boolean(templateId),
  });

  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [templateId])

  const handleClick = (templateId: string) => {
    setTemplateId(templateId);
  };

  return {
    isSuccess,
    isError,
    isLoading,
    data: data ?? {} as ISingleTemplate,
    getSingleTemplate: handleClick
  }
}
