import { ApiClient } from '../transport';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ApiClientContextProps {
  client: ApiClient ;
  userToken: string;
  setUserToken: (token: string) => void;
}

const token = localStorage.getItem('token') || '';

const apiClient = new ApiClient(token);

const defaultContextValue: ApiClientContextProps = {
  client: apiClient,
  userToken: token,
  setUserToken: () => {},
};

const ApiClientContext = createContext<ApiClientContextProps>(defaultContextValue);

export const ApiClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState(token);

  const [client, setClient] = useState<ApiClient>(apiClient);

  useEffect(() => {
    if (userToken && userToken !== token) {
      const updatedClient = new ApiClient(userToken);
      setClient(updatedClient);
      localStorage.setItem('token', userToken);
    }
  }, [userToken]);

  return (
    <ApiClientContext.Provider value={{ client, userToken, setUserToken }}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = (): ApiClient => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useApiClient must be used within an ApiClientProvider');
  }
  return context.client;
};

export const useUserToken = (): [string, (token: string) => void] => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useUserToken must be used within an ApiClientProvider');
  }
  return [context.userToken, context.setUserToken];
};