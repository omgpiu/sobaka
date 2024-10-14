import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApiClientProvider } from './context';
import { Main } from './pages/main';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './transport';


const App = () => {
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
  };



export const WrappedApp = () => {
  return (<App />);
};