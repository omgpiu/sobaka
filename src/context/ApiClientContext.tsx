import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApiClient } from '../transport';
import { message } from 'antd';


interface ApiClientContextProps {
  client: ApiClient | null;
  userToken: string;
  setUserToken: (token: string) => void;
}

const ApiClientContext = createContext<ApiClientContextProps | null>(null);

const token = localStorage.getItem('token') || ''
const apiClient = new ApiClient(token)

export const ApiClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ loading, setLoading ] = useState(true);
  const [ userToken, setUserToken ] = useState('');

  const [ client, setClient ] = useState<ApiClient>(apiClient);

  useEffect(() => {
    const initializeClient = async () => {
      try {

        if (Boolean(userToken) && userToken !== token) {
          const updatedClient = new ApiClient(userToken);
          setClient(updatedClient);
        }

      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    initializeClient();
  }, [ userToken ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ApiClientContext.Provider value={ { client, userToken, setUserToken } }>
      { children }
    </ApiClientContext.Provider>
  );
};

export const useApiClient = (): ApiClient | null => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useApiClient must be used within an ApiClientProvider');
  }
  return context.client;
};

export const useUserToken = (): [ string, (token: string) => void ] => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useUserToken must be used within an ApiClientProvider');
  }
  return [ context.userToken, context.setUserToken ];
};
