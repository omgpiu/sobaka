import  { ReactNode } from 'react';
import { AuthProvider as OidcProvider, AuthProviderProps } from 'react-oidc-context';

interface AuthContextProviderProps {
  children: ReactNode;
}

const oidcConfig: AuthProviderProps = {
  authority: 'http://localhost:5556/dex',
  client_id: 'example-app-Ov23ligW01PTjNwnvqcz',
  redirect_uri: 'http://localhost:5556/dex/callback',
  // scope: 'openid profile email',
  response_type: 'code',
  loadUserInfo: true,
  // client_secret: import.meta.env.VITE_OIDC_SECRET,
};


export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  return <OidcProvider {...oidcConfig}>{children}</OidcProvider>;
};


