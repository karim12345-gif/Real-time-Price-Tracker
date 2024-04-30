import { renderHook } from '@testing-library/react-hooks';
import { useGetListOptionsContract } from '../../services/hooks';
import { ReactQueryProvider } from '../../pages';
import { useWebSocket } from '../../hook';
import { expect } from 'vitest';

describe('make sure all requests are made', () => {
  test('get list option contract', async () => {
    const wrapper = ({ children }: any) => (
      <ReactQueryProvider>{children}</ReactQueryProvider>
    );

    const { result, waitFor } = renderHook(() => useGetListOptionsContract(), {
      wrapper,
    });

    await waitFor(() => result.current.isSuccess, {
      timeout: 10000,
    });

    expect(result.current.data).not.toBeNull();
  });

  test('successful response from websocket', async () => {
    const url = 'ws://localhost:8000/ws';

    const { result, waitFor } = renderHook(() => useWebSocket(url));

    await waitFor(() => typeof result.current.marketData !== 'undefined', {
      timeout: 10000,
    });

    expect(result.current.error).toBeNull();
  });
});
