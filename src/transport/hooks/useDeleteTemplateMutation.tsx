import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../context';
import { ITemplate } from '../types.ts';
import { message } from 'antd';

export const useDeleteTemplateMutation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isSuccess, data, isPending } = useMutation({
    mutationFn: (templateId: number | string) => apiClient.deleteTemplate(Number(templateId)),
    onSuccess: ({ templateId }: { templateId: number }) => {
      queryClient.setQueryData([ 'templateList' ], (oldData: ITemplate[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.filter((oldData: ITemplate) => Number(Number(oldData.templateId) !== Number(templateId)))
      });
      message.success('Теймплейт удален: ' + templateId);
    },
    onError: (_, variables) => {
      message.error('Теймплейт не был удален: ' + variables);
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
