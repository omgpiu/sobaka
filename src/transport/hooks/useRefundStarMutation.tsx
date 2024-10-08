import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../context';
import { ITransaction } from '../types.ts';

export const useRefundStarMutation = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  const { mutateAsync, isError, isSuccess, data,isPending } = useMutation({
    mutationFn: (starId: number) => apiClient.refundUserStar(starId),
    onSuccess: ({starId}: {starId:number}) => {
      console.log('oNSUCCES',starId)
      queryClient.setQueryData(['stars'], (oldData: ITransaction[] | undefined) => {
        if (!oldData) return oldData;
        console.log('starId filter', starId);
        return oldData.map(star=>{
          if(star.id === starId){
            return {...star, status:'refunded'}
          }
          return star;
        })
      });
    }
  });

  return {
    isSuccess,
    isError,
    data,
    refundStar: mutateAsync,
    isPending,
  };
};
