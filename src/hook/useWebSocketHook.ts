
// ** React Import
import { useEffect, useState } from 'react';

//* interface import
import { IMarketStreams } from '../interfaces';

// ** Custom hook to get market data */
const useWebSocket = (url: string) => {
  // ** States
  const [marketData, setMarketData] = useState<IMarketStreams | null>(null);
  const [error, setError] = useState<string | null>(null);


  // ** WebSocket connection
  const newSocket = new WebSocket(url);

  // ** WebSocket connection handlers with keys
  const handleOpen = () => {
    newSocket.send(
      JSON.stringify({
        id: process.env.REACT_APP_WEBSOCKET_ID_KEY,
        method: process.env.REACT_APP_WEBSOCKET_METHOD_KEY,
        params: process.env.REACT_APP_WEBSOCKET_PARAMS_KEY,
      })
    );
  };

  // ** WebSocket message handler
  const handleMessage = (event: MessageEvent) => {
    if (event.data === 'ping') {
      newSocket.send('pong');
      return;
    }

    try {
      // ** Parsing JSON data
      const { data }: { stream: string; data: IMarketStreams } = JSON.parse(
        event.data as string
      );
      // ** Setting market data to state
      setMarketData(data);
    } catch (error) {
    
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

  return { marketData, error };
};

export default useWebSocket;
