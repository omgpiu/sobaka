import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../context';
import { ITransaction } from '../types.ts';

export const useDeleteTemplateMutation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isSuccess, data, isPending } = useMutation({
    mutationFn: (templateId: string) => apiClient.deleteTemplate(templateId),
    onSuccess: ({ templateId }: { templateId: number }) => {
      queryClient.setQueryData([ 'templateList' ], (oldData: ITransaction[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.filter((oldData: ITransaction) => oldData.id !== templateId)
      });
    }
  });

  return {
    isSuccess,
    isError,
    data,
    deleteTemplate: mutateAsync,
    isPending,
  };
};
