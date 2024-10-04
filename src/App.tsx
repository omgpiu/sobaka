import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApiClientProvider,AuthProvider } from './context';
import { Main } from './pages/main';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './transport';
import {  useEffect } from 'react';
import { useAuth } from 'react-oidc-context';


const App = () => {
  const auth = useAuth();

  useEffect(() => {
    console.log('useEffect',auth)
    if (!auth.isAuthenticated) {
      console.log('HELLO REDIRECRT')
      auth.signinRedirect();
    }
  }, []);
  console.log(auth,'auth')
  if (auth.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <ApiClientProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/callback" element={<div>OpenION</div>} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </ApiClientProvider>
    );
  }

  if (auth.error) {
    return <div>Ошибка авторизации: {auth.error.message}</div>;
  }
  return  <div style={{color:'black'}}>GOVNO  </div>
};



export const WrappedApp = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};