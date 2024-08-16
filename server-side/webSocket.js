import { WebSocketServer } from 'ws';
import { EventEmitter } from 'events';
import dotenv from 'dotenv';
import { connectMongo } from './config/db.js'; 
import { getCountUnreadMessages } from './services/messages.service.js';
import { log } from 'console';

dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

connectMongo();

const eventEmitter = new EventEmitter(); 

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      const parsedMessage = JSON.parse(message);  
      const { userId,type } = parsedMessage;
      console.log(userId, "userId");
      console.log(type, "type");
      switch (type) {
        case "countUnread":
          ws.userId = userId.toString();
          ws.send(await getCountUnreadMessages(ws.userId));
          break;
      
        default:
          break;
      }

    });
  

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function broadcastMessage(userId, message) {
    wss.clients.forEach((client) => {
      if (client.userId === userId) {
        client.send(`${message}`);
      }
    });
}

eventEmitter.on('new-message', (data) => {
  const { userId, type, countUnreadMessages } = data;
  switch (type) {
    case "countUnread":
      broadcastMessage(userId, countUnreadMessages);
      break;
  
    default:
      break;
  }
});

export { eventEmitter }; 
