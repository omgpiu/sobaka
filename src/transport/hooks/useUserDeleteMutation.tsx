import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../context';

export const useUserDeleteMutation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const {mutateAsync, isError, isSuccess, data} = useMutation({
      mutationFn: (userId: number) => apiClient.deleteUser(userId),
    onSuccess: () => queryClient.removeQueries()
    },
  );

  return {
    isSuccess,
    isError,
    data,
    deleteUser: mutateAsync,
  };
};
