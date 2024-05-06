import { ThemeColor } from "../components/layouts/types";



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


export type {  IOptionsContractResponse, OptionsContractResponse,IMarketStreams, CardData, ExchangeResponseRow, ReactQueryProviderProps};
