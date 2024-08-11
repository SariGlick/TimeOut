import { WebSocketServer } from 'ws';
import mongoose from 'mongoose';
import { connectMongo } from './config/db.js'; // Assuming this connects to MongoDB
import { EventEmitter } from 'events';
import { getCountUnreadMessages } from './controllers/message.controller.js';
import dotenv from 'dotenv';
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

connectMongo();

const eventEmitter = new EventEmitter(); 

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', async (message) => {
    ws.userId = message.toString();
    ws.send(await getCountUnreadMessages(ws.userId));
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
  const { userId, countUnreadMessages } = data;
  broadcastMessage(userId, countUnreadMessages);
});

export { eventEmitter }; 
