import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ResponseModelHelper } from "../services/helpers";
import { ReactQueryProviderProps } from "../interfaces";

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any) => ResponseModelHelper(error),
    }),
    mutationCache: new MutationCache({
      onError: (error: any) => ResponseModelHelper(error),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
