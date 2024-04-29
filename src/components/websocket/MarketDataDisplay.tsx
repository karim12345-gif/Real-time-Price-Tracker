import React from "react";
import { useWebSocket } from "../context/WebSocketContext";
import BackArrowButton from "../BackArrowButton";

const MarketDataDisplay: React.FC = () => {
  const { marketData } = useWebSocket();

  console.log("marketData", marketData);

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

export default MarketDataDisplay;
