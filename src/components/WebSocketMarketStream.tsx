import React, { useEffect, useState } from "react";
import { IMarketStreams } from "../interfaces";
import BackArrowButton from "./BackArrowButton";

const WebSocketMarketStream: React.FC = () => {
  const [marketData, setMarketData] = useState<IMarketStreams | null>(null);

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
    <div>
      <BackArrowButton />

      {marketData && (
        <div>
          <h2>Market Data</h2>
          <p>Funding Rate: {marketData.fundingRate}</p>
          <p>Next Funding Time: {marketData.nextFundingTime}</p>
          <p>Mark Price: {marketData.markPrice}</p>
          <p>Offchain Mark Price: {marketData.fundingRate}</p>{" "}
          {/* Corrected here */}
          <p>Offchain Mark Price 24H Ago: {marketData.price24HAgo}</p>{" "}
          {/* Corrected here */}
          {/* Add more JSX to display other properties */}
        </div>
      )}
    </div>
  );
};

export default WebSocketMarketStream;
