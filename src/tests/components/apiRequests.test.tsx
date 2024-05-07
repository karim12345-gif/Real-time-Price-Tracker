// ** react hook
import { renderHook } from "@testing-library/react-hooks";

// ** hooks imports
import { useGetListOptionsContract } from "../../services/hooks";

// ** custom pages imports
import { ReactQueryProvider } from "../../pages";
// ** vitest imports
import { expect } from "vitest";
import { WebSocketProvider, useWebSocket } from "../../context";

describe("make sure all requests are made", () => {
  test("get list option contract", async () => {
    const wrapper = ({ children }: any) => (
      <ReactQueryProvider>{children}</ReactQueryProvider>
    );

    // ** Render the hook helps to test the useGetListOptionsContract hook
    const { result, waitFor } = renderHook(() => useGetListOptionsContract(), {
      wrapper,
    });

    // ** Wait for the request to be successful
    await waitFor(() => result.current.isSuccess, {
      timeout: 10000,
    });

    // **  Assert that data is not null after successful request
    expect(result.current.data).not.toBeNull();
  });

  test("successful response from websocket", async () => {
    const url = "ws://localhost:8000/ws";
    const wrapper = ({ children }: any) => (
      <WebSocketProvider>{children}</WebSocketProvider>
    );

    // ** Render the hook useWebSocket with the provided URL
    const { result, waitFor } = renderHook(() => useWebSocket(url), {
      wrapper,
    });

    await waitFor(() => typeof result.current.marketData !== "undefined", {
      timeout: 10000,
    });

    // Assert that there is no error
    expect(result.current.error).toBeNull();
  });
});
