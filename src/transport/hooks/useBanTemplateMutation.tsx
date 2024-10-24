import { useMutation, } from '@tanstack/react-query';
import { useApiClient } from '../../context';
import { message } from 'antd';
import { queryClient } from '../clients';
import { ITemplate } from '../types.ts';


export const useBanTemplateMutation = (limit: number, offset: number) => {
  const apiClient = useApiClient();

  const { mutateAsync, isError, isSuccess, data, isPending } = useMutation({
    mutationFn: (templateId: number | string) => apiClient.banTemplate(Number(templateId)),
    onSuccess: async (_, variables) => {
      await queryClient.setQueryData([ 'templateList', limit, offset ], (oldData: ITemplate[]) => {
        if (!oldData) return oldData;
        return oldData.filter((item: ITemplate) => Number(item.templateId) !== Number(variables))
      });
      await queryClient.setQueryData([ 'templateSingle' ], {})
      await queryClient.setQueryData([ 'userSingle' ], {})
      message.success('Чухан забанен на создание темплейтов: ' + variables);
    },
    onError: async (_, variables) => {
      await message.error('Не получилось забанить: ' + variables);
    }
  });


  return {
    isSuccess,
    isError,
    data,
    banTemplate: mutateAsync,
    isPending,
  };
};
