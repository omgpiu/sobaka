import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApiClient } from '../transport';


interface ApiClientContextProps {
  client: ApiClient | null;
  userToken: string;
  setUserToken: (token: string) => void;
}

const ApiClientContext = createContext<ApiClientContextProps | null>(null);

export const ApiClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<ApiClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const token = userToken || localStorage.getItem('token')

        if(token){
          const apiClient = new ApiClient(token);
          setClient(apiClient);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    initializeClient();
  }, [userToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ApiClientContext.Provider value={{ client, userToken, setUserToken }}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = (): ApiClient|null => {
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
