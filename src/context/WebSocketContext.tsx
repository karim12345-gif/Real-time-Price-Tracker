// ** rect imports
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** interface imports
import { IMarketStreams } from "../interfaces";

// Context props
interface WebSocketContextProps {
  marketData: IMarketStreams | null;
  error: string | null;
}

// Create WebSocket context
const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

const defaultUrl = process.env.REACT_APP_WEBSOCKET_URL_LINK || "";

// Context provider
export const WebSocketProvider: React.FC<{
  children: React.ReactNode;
  url?: string;
}> = ({ children, url }) => {
  // States for market data and error
  const [marketData, setMarketData] = useState<IMarketStreams | null>(null);
  const [error, setError] = useState<string | null>(null);

  // WebSocket connection handlers
  const handleOpen = (newSocket: WebSocket) => {
    // console.log("WebSocket connection opened");
    newSocket.send(
      JSON.stringify({
        id: process.env.REACT_APP_WEBSOCKET_ID_KEY,
        method: process.env.REACT_APP_WEBSOCKET_SUBSCRIPTION_METHOD_KEY,
        params: process.env.REACT_APP_WEBSOCKET_PARAMS_KEY,
      })
    );
  };

  const handleMessage = (event: MessageEvent, newSocket: WebSocket) => {
    // console.log("Received message:", event.data);
    if (event.data === "ping" || event.data === "ping frame") {
      newSocket.send("pong" || "pong frame");
      return;
    }

    try {
      const { data }: { stream: string; data: IMarketStreams } = JSON.parse(
        event.data as string
      );
      setMarketData(data);
    } catch (error) {
      toast.error("Error parsing JSON:");
      console.error("Error parsing JSON:", error);
    }
  };

  const handleClose = (event: CloseEvent) => {
    // console.log("WebSocket connection closed");
    if (event.code === 404 || event.code === 500) {
      setError("Server error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const finalUrl = url || defaultUrl;
    if (finalUrl) {
      const newSocket = new WebSocket(finalUrl);

      newSocket.onopen = () => handleOpen(newSocket);
      newSocket.onmessage = (event) => handleMessage(event, newSocket);
      newSocket.onclose = handleClose;

      return () => {
        newSocket.close();
      };
    }
  }, [url]); // Only create WebSocket connection if URL is provided

  // ** Context value
  const contextValue: WebSocketContextProps = {
    marketData,
    error,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

//** Custom hook to use WebSocket context
export const useWebSocket = (url?: string) => {
  if (!url) {
    throw new Error("WebSocket URL is required");
  }

  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }

  return context;
};
