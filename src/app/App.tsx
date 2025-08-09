import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppRoutes } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
