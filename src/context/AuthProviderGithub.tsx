import  { ReactNode } from 'react';
import { AuthProvider as OidcProvider, AuthProviderProps } from 'react-oidc-context';

interface AuthContextProviderProps {
  children: ReactNode;
}

const oidcConfig: AuthProviderProps = {
  authority: 'http://localhost:5556/dex',
  client_id: 'client_id',
  redirect_uri: 'client_id',
  scope: 'openid profile email',
  response_type: 'code',
};


export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  return <OidcProvider {...oidcConfig}>{children}</OidcProvider>;
};


