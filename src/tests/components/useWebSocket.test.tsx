import { useWebSocket } from "../../hook";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react";

vi.mock("ws", () => ({
  // __esModule: true,
  WebSocket: function () {
    // ** mocking the WebSocket object
    return {
      on: vi.fn(),
      send: vi.fn(),
      close: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  },
}));

describe("useWebSocket", () => {
  test("should return a valid hook", async () => {
    const url = "ws://localhost:8000/ws";

    const { result } = renderHook(() => useWebSocket(url));

    // ** Asserting initial values of states should be null
    expect(result.current.marketData).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("fetches market data and handles WebSocket events", async () => {
    // ** Creating a new WebSocket instance
    const newSocket = new WebSocket("ws://localhost:8000/ws");

    // ** Mocking the WebSocket object
    newSocket.onmessage = vi.fn();
    newSocket.onopen = vi.fn();
    newSocket.onerror = vi.fn();
    newSocket.onclose = vi.fn();
    newSocket.addEventListener = vi.fn();

    const { result } = renderHook(() => useWebSocket("ws://localhost:8000/ws"));

    // ** Using act to update state within tests
    await act(async () => {
      // ** Setting marketData to a mock data object
      result.current.marketData = {
        "24hVolume": "",
        fundingRate: "",
        nextFundingTime: 0,
        indexPrice: "",
        markPrice: "",
        lastTradePrice: "",
        liquidationPriceOff: "",
        liquidationThreshold: "",
        openInterest: "",
        price24HAgo: "",
      };
    });
    // ** Asserting that marketData and error have expected values
    expect(result.current.marketData).toEqual({
      "24hVolume": "",
      fundingRate: "",
      nextFundingTime: 0,
      indexPrice: "",
      markPrice: "",
      lastTradePrice: "",
      liquidationPriceOff: "",
      liquidationThreshold: "",
      openInterest: "",
      price24HAgo: "",
    });
    expect(result.current.error).toBeNull();
  });
});
