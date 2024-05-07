
// ** React Import
import { useEffect, useState } from 'react';

//* interface import
import { IMarketStreams } from '../interfaces';
import toast from 'react-hot-toast';

// ** Custom hook to get market data */
const useWebSocket = (url: string) => {
  // ** States
  const [marketData, setMarketData] = useState<IMarketStreams | null>(null);
  const [error, setError] = useState<string | null>(null);


  // ** WebSocket connection
  const newSocket = new WebSocket(url);

  // ** WebSocket connection handlers with keys and this will subscribe to a streams
  const handleOpen = () => {
    newSocket.send(
      JSON.stringify({
        id: process.env.REACT_APP_WEBSOCKET_ID_KEY,
        method: process.env.REACT_APP_WEBSOCKET_SUBSCRIPTION_METHOD_KEY,
        params: process.env.REACT_APP_WEBSOCKET_PARAMS_KEY,
      })
    );
  };

  
  // ** WebSocket message handler
  const handleMessage = (event: MessageEvent) => {
     //** Checking if the received message is a "ping" message
    if (event.data === 'ping' || event.data === 'ping frame') {
      newSocket.send('pong' || 'pong frame');
      return;
    }

    try {
      // ** Parsing JSON data since data from web socket is string, so we need to convert it to javascript object
      const { data }: { stream: string; data: IMarketStreams } = JSON.parse(
        event.data as string
      );
      // ** passing the data to the state
      setMarketData(data);
    } catch (error) {
      toast.error('Error parsing JSON:');
      console.error('Error parsing JSON:', error);
    }
  };

  // ** WebSocket close handler
  const handleClose = (event: CloseEvent) => {
    if (event.code === 404 || event.code === 500) {
      setError('Server error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const newSocket = new WebSocket(url);


    // ** connection the WebSockets handler connection to their respective functions
    newSocket.onopen = handleOpen;
    newSocket.onmessage = handleMessage;
    newSocket.onclose = handleClose;
    

    return () => {
    newSocket.close();
    };
  }, [url]);


  // ** Return market data and error states , which will be used globally in the app
  return { marketData, error };
};

export default useWebSocket;
