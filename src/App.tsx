import { Outlet } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

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
