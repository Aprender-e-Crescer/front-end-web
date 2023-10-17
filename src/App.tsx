import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}

export default App;
