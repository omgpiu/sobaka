import { BrowserRouter as Router, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ApiClientProvider, useAuth } from './context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './transport';
import { TemplatesPage, MainPage } from './pages';
import { BaseLayout } from './components';
import { LoginForm } from './pages/login';


const ProtectedRoute: React.FC = () => {
  const { isAuthent} = useAuth()

  if (!isAuthent) {
    return <Navigate to="/login"/>;
  }

  return <Outlet/>;
};

const App = () => {
  return (
    <ApiClientProvider>
      <QueryClientProvider client={ queryClient }>
        <Router>
          <Routes>
            <Route path="/" element={ <ProtectedRoute/> }>
              <Route path="/" element={ <BaseLayout/> }>
                <Route index element={ <MainPage/> }/>
                <Route path="templates" element={ <TemplatesPage/> }/>
              </Route>
            </Route>
            <Route path="/login" element={ <LoginForm/> }/>
            <Route
              path="*"
              element={ <Navigate to="/" replace/> }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ApiClientProvider>
  );
};


export const WrappedApp = () => {
  return (<App/>);
};