import { WebSocketServer } from 'ws';
import mongoose from 'mongoose';
import { connectMongo } from './config/db.js'; // Assuming this connects to MongoDB
import { EventEmitter } from 'events';

const wss = new WebSocketServer({ port: 8080 });

connectMongo();

const eventEmitter = new EventEmitter(); 

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', async (message) => {
    // ws.userId = message.toString();
    // Handle incoming messages from client (if needed)
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Function to send message to all connected clients
function broadcastMessage(userId, message) {
  wss.clients.forEach((client) => {
    // if (client.userId === userId) {
      client.send(`${userId} ${message}`);
    // }
  });
}

// Subscribe to 'new-message' event from controller
eventEmitter.on('new-message', (data) => {
  const { userId, countUnreadMessages } = data;
  broadcastMessage(userId, `count ${countUnreadMessages}`);
});

export { eventEmitter }; // Export event emitter for use in controller
