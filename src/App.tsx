import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApiClientProvider } from './context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './transport';
import { TemplatesPage, MainPage } from './pages';
import { BaseLayout } from './components';


const App = () => {
  return (
    <ApiClientProvider>
      <QueryClientProvider client={ queryClient }>
        <Router>
          <Routes>
            <Route path="/" element={ <BaseLayout/> }>
              <Route index element={ <MainPage/> }/>
              <Route path="templates" element={ <TemplatesPage/> }/>
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </ApiClientProvider>
  );
};


export const WrappedApp = () => {
  return (<App/>);
};