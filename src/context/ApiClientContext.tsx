import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ApiClient } from '../transport';

const ApiClientContext = createContext<ApiClient | null>(null);

export const ApiClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<ApiClient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        // const user: User | null = await userManager.getUser();

        // if (user && !user.expired) {
          const apiClient = new ApiClient('user.access_token');
          setClient(apiClient);
        // } else {

          // userManager.signinRedirect();
        // }
      } catch (error) {
        console.error('Error during OIDC initialization:', error);
        // userManager.signinRedirect();
      } finally {
        setLoading(false);
      }
    };

    initializeClient();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!client) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <ApiClientContext.Provider value={client}>
      {children}
    </ApiClientContext.Provider>
  );
};


export const useApiClient = (): ApiClient => {
  const context = useContext(ApiClientContext);
  if (!context) {
    throw new Error('useApiClient must be used within an ApiClientProvider');
  }
  return context;
};