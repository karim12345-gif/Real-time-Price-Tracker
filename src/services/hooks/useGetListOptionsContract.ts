import axios, { AxiosResponse } from "axios"
import { CoinGeckoApi } from "../api"
import { useQuery } from "@tanstack/react-query"
import { IOptionsContractResponse } from "../../interfaces"

const GetListOptionsContract = async (): Promise<IOptionsContractResponse> => {
  const response: AxiosResponse<IOptionsContractResponse> = await axios.get(
    CoinGeckoApi.getOptionsContract(),
    
  )

  return response.data  
}

export const useGetListOptionsContract = (

) => {
  return useQuery({
    queryKey: ['GetCoinList'],
    queryFn: () => GetListOptionsContract()
  })
}
