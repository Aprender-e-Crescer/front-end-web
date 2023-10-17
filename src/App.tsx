import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import { useRef, useEffect, useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import { useAuthStore } from './stores/useAuthStore';
import { checkIfTokenIsValid, getExpirationIfTokenIsValid } from './utils/logout';
import { HTTP } from './services/api';

const REQUEST_MINIMAL_INTERVAL = 6000;

const handleCheckIfRefreshTokenIsInvalid = (token: string) =>
  !checkIfTokenIsValid(token) && (useAuthStore.setState({ token: null }), true);

async function refreshToken() {
  try {
    const {
      data: { access_token: token },
    } = await HTTP.get<{ access_token: string }>('/api/auth/refresh');

    useAuthStore.setState({ token });
  } catch (error) {
    useAuthStore.setState({ token: null });
  }
}

const queryClient = new QueryClient();

function App() {
  const timeoutRefreshIdRef = useRef<null | NodeJS.Timeout>(null);

  const handleSetTimeoutToRefresh = useCallback(expirationTime => {
    const nextRefreshTime = expirationTime - Date.now() - REQUEST_MINIMAL_INTERVAL;
    timeoutRefreshIdRef.current = setTimeout(refreshToken, nextRefreshTime);
  }, []);

  const handleRefreshToken = useCallback(
    async (token: string) => {
      const expirationTime = getExpirationIfTokenIsValid(token);

      if (!expirationTime) return;

      timeoutRefreshIdRef.current && clearTimeout(timeoutRefreshIdRef.current);
      handleSetTimeoutToRefresh(expirationTime);
    },
    [handleSetTimeoutToRefresh],
  );

  useEffect(
    () =>
      useAuthStore.subscribe(
        state => state.token,
        token => {
          if (handleCheckIfRefreshTokenIsInvalid(token)) return;

          handleRefreshToken(token);
        },
        { fireImmediately: true, equalityFn: shallow },
      ),
    [handleRefreshToken],
  );

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}

export default App;
