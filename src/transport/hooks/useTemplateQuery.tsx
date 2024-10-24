import { useQuery } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { useEffect, useState } from 'react';
import { ISingleTemplate, UserExtracted } from '../types.ts';


export const useTemplateQuery = () => {
  const apiClient = useApiClient()

  const [ templateId, setTemplateId ] = useState<null | string>(null);

  const { data, isError, isLoading, refetch, isSuccess } = useQuery({
    queryKey: [ 'extendedTemplateInfo' ],
    queryFn: async () => {
      const [ template, user ] = await Promise.all([
        apiClient.getTemplate(templateId!),
        apiClient.getUser(templateId!)
      ]);

      return {
        ...template,
        ...user
      }

    },

    enabled: Boolean(templateId),
  });


  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [ templateId ])

  const handleClick = (templateId: string) => {
    setTemplateId(templateId);
  };

  return {
    isSuccess,
    isError,
    isLoading,
    templateInfo: data ?? {} as ISingleTemplate & UserExtracted,
    getExtendedTemplateInfo: handleClick
  }
}
