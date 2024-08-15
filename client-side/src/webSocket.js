import { useEffect, useState } from 'react';

const useWebSocket = (userId) => {
  const [cntUnreadMessages, setCntUnreadMessages] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send(userId);
    };

    ws.onmessage = (event) => {
      const response = event.data;
      console.log(`Received from server: ${response}`);
      setCntUnreadMessages(response);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [userId]);

  return { cntUnreadMessages, socket };
};

export default useWebSocket;
