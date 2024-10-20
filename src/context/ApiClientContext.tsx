import { ApiClient } from '../transport';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface ApiClientContextProps {
  client: ApiClient;
  login: (token: string) => void;
  isAuthent: boolean
  loading: boolean
  logout:()=>void;
}

const token = localStorage.getItem('token') || '';

const apiClient = new ApiClient(token);

const defaultContextValue: ApiClientContextProps = {
  client: apiClient,
  login: () => {
  },
  logout: () => {},
  isAuthent: false,
  loading: false
};

const ApiClientContext = createContext<ApiClientContextProps>(defaultContextValue);

export const ApiClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ isAuthent, setIsAuthent ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const [ client, setClient ] = useState<ApiClient>(apiClient);

  const login = async (token: string) => {
    setLoading(true);
    localStorage.setItem('token', token);
    const updatedClient = new ApiClient(token);
    setClient(updatedClient);
    await updatedClient.getAvailableGoods().then(() => {
      setIsAuthent(true)
    }).catch(() => {

    }).finally(() => {
      setLoading(false)
    })

  }

  const logout = ()=>{
    localStorage.removeItem('token');
    setIsAuthent(false)
  }


  useEffect(() => {
    login(token)
  }, [ ]);


  return (
    <ApiClientContext.Provider value={ { client,  isAuthent, login,logout, loading } }>
      { children }
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

export const useAuth = (): {
  login: (token: string) => void
  isAuthent: boolean
  loading: boolean
  logout:()=>void
} => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useUserToken must be used within an ApiClientProvider');
  }
  const { login, isAuthent, loading,logout } = context
  return {
    login,
    isAuthent,
    loading,
    logout
  }
};