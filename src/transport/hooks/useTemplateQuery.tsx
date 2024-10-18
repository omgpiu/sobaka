import { useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useState } from 'react';
import { ISingleTemplate, UserExtracted } from '../types.ts';


export const useTemplateQuery = () => {
  const apiClient = useApiClient()

  const [templateId, setTemplateId] = useState< null | string >(null);

  const {data, isError, isLoading, isSuccess,refetch} = useQuery({
    queryKey: ['templateSingle'],
    queryFn: () => apiClient.getTemplate(templateId!),
    enabled: Boolean(templateId),
  });

  const {data:userData, isError:isUserError, isLoading:isUserLoading,refetch:refetchUser} = useQuery({
    queryKey: ['userSingle'],
    queryFn: () => apiClient.getUser(templateId!),
    enabled: Boolean(templateId),
  });

  console.log(userData,'userData')

  useEffect(() => {
    if (isSuccess) {
      refetch()
      refetchUser()
    }
  }, [templateId])

  const handleClick = (templateId: string) => {
    setTemplateId(templateId);
  };

  return {
    isSuccess,
    isError:isError||isUserError,
    isLoading:isUserLoading || isLoading,
    template:data ?? {} as ISingleTemplate,
    user:userData ?? {} as UserExtracted,
    getSingleTemplate: handleClick
  }
}
