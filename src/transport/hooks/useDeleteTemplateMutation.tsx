import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../context';
import { message } from 'antd';
import { ITemplate } from '../types.ts';


export const useDeleteTemplateMutation = (limit: number, offset: number) => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isSuccess, data, isPending } = useMutation({
    mutationFn: (templateId: number | string) => apiClient.deleteTemplate(Number(templateId)),
    onSuccess: async (_, variables) => {
      queryClient.setQueryData([ 'templateList', limit, offset ], (oldData: ITemplate[]) => {
        if (!oldData) return oldData;
        return oldData.filter((item: ITemplate) => Number(item.templateId) !== Number(variables))

      });
      await queryClient.setQueryData([ 'templateSingle' ], {})
      await queryClient.setQueryData([ 'userSingle' ], {})

      message.success('Темплейт удален: ' + variables);
    },
    onError: async (_, variables) => {
      await message.error('Не получилось удалить темплейт: ' + variables);
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
