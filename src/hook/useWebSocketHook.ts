import { useEffect, useState } from 'react';
import { IMarketStreams } from '../interfaces';

const useWebSocket = (url: string) => {
  const [marketData, setMarketData] = useState<IMarketStreams | null>(null);
  const [error, setError] = useState<string | null>(null);


 // ** Function to handle WebSocket connection

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      // Subscribing to market stream according to the API documentation
      newSocket.send(
        JSON.stringify({
          id: process.env.REACT_APP_WEBSOCKET_ID_KEY,
          method: process.env.REACT_APP_WEBSOCKET_METHOD_KEY,
          params: process.env.REACT_APP_WEBSOCKET_PARAMS_KEY,
        })
      );
    };

    newSocket.onmessage = (event: MessageEvent) => {
      // Checking if the message is a ping frame
      if (event.data === 'ping') {
      
        // Respond with a pong frame to maintain the connection
        newSocket.send('pong');
        return;
      }

      // Parsing the message as JSON
      try {
        const { data }: { stream: string; data: IMarketStreams } = JSON.parse(
          event.data as string
        );
      
        // Set the received market data to state
        setMarketData(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // Handle parsing error
      }
    };

    newSocket.onclose = (event: CloseEvent) => {
    
      if (event.code === 404 || event.code === 500) {
        setError('Server error occurred. Please try again later.');
      }
    };

    return () => {
      // Cleanup function to Close WebSocket connection when component unmounts, preventing memory leaks
      newSocket.close();
    };
  }, [url]);

  return { marketData, error };
};

export default useWebSocket;
