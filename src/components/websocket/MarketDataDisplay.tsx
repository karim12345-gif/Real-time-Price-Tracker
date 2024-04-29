import React from "react";
import { IMarketStreams } from "../../interfaces";

interface MarketDataDisplayProps {
  marketData: IMarketStreams;
}

const MarketDataDisplay: React.FC<MarketDataDisplayProps> = ({
  marketData,
}) => {
  return (
    <div>
      <h2>Market Data</h2>
      <p>Funding Rate: {marketData.fundingRate}</p>
      <p>Next Funding Time: {marketData.nextFundingTime}</p>
      <p>Mark Price: {marketData.markPrice}</p>
      <p>Offchain Mark Price: {marketData.markPrice}</p>
      <p>Offchain Mark Price 24H Ago: {marketData.price24HAgo}</p>
      {/* Add more JSX to display other properties */}
    </div>
  );
};

export default MarketDataDisplay;
