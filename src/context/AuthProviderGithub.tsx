import  { ReactNode } from 'react';
import { AuthProvider as OidcProvider, AuthProviderProps } from 'react-oidc-context';

interface AuthContextProviderProps {
  children: ReactNode;
}

const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_OIDC_ISSUER,
  client_id: import.meta.env.VITE_OIDC_ACCESS,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  scope: 'openid profile email',
  response_type: 'code',
  loadUserInfo: true,
  client_secret: import.meta.env.VITE_OIDC_SECRET,
};


export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  console.warn(oidcConfig,'congig')
  return <OidcProvider {...oidcConfig}>{children}</OidcProvider>;
};


