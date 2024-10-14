import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { IParamsAddGoods } from '../types';
import { type UserMiningExtracted } from '../extractors';


export const useAddGoods = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const {mutateAsync, isError, isSuccess, data,isPending} = useMutation({
      mutationFn: (params: Omit<IParamsAddGoods,'userId'>) => {

        const userData = queryClient.getQueryData(['user']) as UserMiningExtracted
        const userId = userData.user.UserID

        return apiClient!.addGoods({ ...params, userId });
      },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
    },
  );

  return {
    isSuccess,
    isError,
    data,
    isPending,
    addGoods: mutateAsync,
  };
};

