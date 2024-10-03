import { QueryClient } from "@tanstack/react-query"

const queryClientParams = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60000,
    },
  },
}

export const queryClient = new QueryClient(queryClientParams)
