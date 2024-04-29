import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IMarketStreams } from "../../interfaces";

// Define the context props
interface WebSocketContextProps {
  marketData: IMarketStreams | undefined;
}

// Create the WebSocket context
const WebSocketContext = createContext<WebSocketContextProps>({
  marketData: {} as IMarketStreams,
});

// Custom hook to use the WebSocket context
export const useWebSocket = () => useContext(WebSocketContext);

// WebSocketProvider component
export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [marketData, setMarketData] = useState<IMarketStreams>();

  useEffect(() => {
    const newSocket = new WebSocket(
      "wss://stream.base-mainnet.jojo.exchange/v1/multiple?streams=btcusdc@market"
    );

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      // Subscribe to market stream
      newSocket.send(
        JSON.stringify({
          id: 1,
          method: "SUBSCRIBE",
          params: ["btcusdc@market"],
        })
      );
    };

    newSocket.onmessage = (event: MessageEvent) => {
      // Check if the message is a ping frame
      if (event.data === "ping") {
        // Handle ping frame (optional)
        console.log("Received ping frame");
        // Respond with a pong frame to maintain the connection
        newSocket.send("pong");
        return;
      }

      // Parse the message as JSON
      try {
        const { stream, data }: { stream: string; data: IMarketStreams } =
          JSON.parse(event.data as string);
        console.log("Received market data:", data);
        // Set the received market data to state
        setMarketData(data);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        // Handle parsing error
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      // Cleanup function: Close WebSocket connection when component unmounts
      newSocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ marketData }}>
      {children}
    </WebSocketContext.Provider>
  );
};
