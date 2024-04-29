import { ThemeColor } from "../components/layouts/types";

interface ICoinsMarketsResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null; // Assuming ROI is nullable
  last_updated: string;
}


type OptionsContractResponse = {
  cfi: string;
  contract_type: string;
  exercise_style: string;
  expiration_date: string;
  primary_exchange: string;
  shares_per_contract: number;
  strike_price: number;
  ticker: string;
  underlying_ticker: string;
};


interface IOptionsContractResponse {
  results: OptionsContractResponse[],
  status: string,
  request_id: string,
  next_url: string
}


//!! using string literals because some of the values in the response body have numbers
interface IMarketStreams {
  "24hVolume": string;
  "fundingRate": string;
  "nextFundingTime": number;
  "indexPrice": string;
  "markPrice": string;
  "lastTradePrice": string;
  "liquidationPriceOff": string;
  "liquidationThreshold": string;
  "openInterest": string;
  "price24HAgo": string;
}


 interface CardData {
  icon: string;
  title: string;
  tooltip: string;
  color: ThemeColor;
  changePercentage?: number | string;
  totalUsers?: number | string | JSX.Element;
}

interface ExchangeResponseRow {
  row: OptionsContractResponse;
}

interface ReactQueryProviderProps {
  children: React.ReactNode;
}







export type { ICoinsMarketsResponse , IOptionsContractResponse, OptionsContractResponse,IMarketStreams, CardData, ExchangeResponseRow, ReactQueryProviderProps};
