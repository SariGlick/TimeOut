import { useState, useEffect } from 'react';
import ListComponenet from './stories/list/List.jsx';
import { getLimitMessages } from './services/limitTheMessage.js';
import Loader from './stories/loader/loader.jsx'; 

function UseLimitMessage() {
  const [messageData, setMessageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '669fb05e1fc53bd33f8bfc0b';
        const messages = await getLimitMessages(userId);
        console.log('messages', messages);
        setMessageData(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>    
        <ListComponenet dataObject={{ messageData }} />    
    </>
  );
}

export default UseLimitMessage;
