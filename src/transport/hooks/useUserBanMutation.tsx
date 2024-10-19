import { useMutation,  useQueryClient } from "@tanstack/react-query"
import { useApiClient } from '../../context';
import { message } from 'antd';


export const useUserBanMutation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const {mutateAsync, isError, isSuccess, data} = useMutation({
      mutationFn: (userId: number) => apiClient.banUser(userId)!,
      onSuccess: async () => {
        message.success('Чухонец забанен!')
        await queryClient.invalidateQueries({ queryKey: ['userSingle'] })
        await queryClient.invalidateQueries({ queryKey: ['user'] })
      },
      onError:()=>{
        message.error('Не получилось забанить засранца')
      }
    },
  );

  return {
    isSuccess,
    isError,
    data,
    banUser: mutateAsync,
  };
};

