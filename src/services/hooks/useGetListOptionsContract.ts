import axios, { AxiosResponse } from "axios"
import { PolygonApi } from "../api"
import { useQuery } from "@tanstack/react-query"
import { IOptionsContractResponse } from "../../interfaces"



//**  Function to get the list of options contracts from the  API
const GetListOptionsContract = async (): Promise<IOptionsContractResponse> => {
  const response: AxiosResponse<IOptionsContractResponse> = await axios.get(
    PolygonApi.getOptionsContract(),
  )

  // console.log('response', response.data)
  
  return response.data  
}


//**  Hook to get the list of options contracts
export const useGetListOptionsContract = (
) => {
  return useQuery({
    queryKey: ['GetCoinList'],
    queryFn: () => GetListOptionsContract(),
   
  })
}
