import { useEffect, useState } from 'react';

const useWebSocket = (userId) => {
  const [cntUnreadMessages, setCntUnreadMessages] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_WS_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify({userId,type:"countUnread"}));
    };

    ws.onmessage = (event) => {
      const response = event.data;
      setCntUnreadMessages(response);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [userId]);

  return { cntUnreadMessages, socket };
};

export default useWebSocket;