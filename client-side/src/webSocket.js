
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import ToastMessage from './stories/Toast/ToastMessage';

const useWebSocket = (userId) => {
  const [cntUnreadMessages, setCntUnreadMessages] = useState(0);
  const [socket, setSocket] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const { enqueueSnackbar } = useSnackbar(); 
  

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send(userId);
    };

    ws.onmessage = (event) => {
      const response =event.data;            
      if (!initialLoad && response > cntUnreadMessages) {
        enqueueSnackbar(<ToastMessage open={true} message={'You received a new message'} type="info" />); 
      }      
      setCntUnreadMessages(response);
      setInitialLoad(false);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [userId,  initialLoad]);

  return { cntUnreadMessages, socket };
};

export default useWebSocket;
