import { useEffect, useState } from 'react';
import { IMarketStreams } from '../interfaces';

const useWebSocket = (url: string) => {
  const [marketData, setMarketData] = useState<IMarketStreams | null>(null);
  const [error, setError] = useState<string | null>(null);


 // ** Function to handle WebSocket connection

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.onopen = () => {
      console.log('WebSocket connected');
      // Subscribing to market stream according to the API documentation
      newSocket.send(
        JSON.stringify({
          id: 1,
          method: 'SUBSCRIBE',
          params: ['btcusdc@market'],
        })
      );
    };

    newSocket.onmessage = (event: MessageEvent) => {
      // Checking if the message is a ping frame
      if (event.data === 'ping') {
        // Handling ping frame (optional)
        console.log('Received ping frame');
        // Respond with a pong frame to maintain the connection
        newSocket.send('pong');
        return;
      }

      // Parsing the message as JSON
      try {
        const { data }: { stream: string; data: IMarketStreams } = JSON.parse(
          event.data as string
        );
        console.log('Received market data:', data);
        // Set the received market data to state
        setMarketData(data);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // Handle parsing error
      }
    };

    newSocket.onclose = (event: CloseEvent) => {
      console.log('WebSocket closed with code:', event.code);
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
