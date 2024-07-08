import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import connectDB from './database.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();

console.log('Starting server...');



app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world')
})


// Middleware to authenticate JWT token
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) return res.sendStatus(401); // Unauthorized

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Forbidden
//         req.user = user;
//         next();
//     });
// };





// Import routes

import profileRoutes from './routes/profileRoutes.js';


// Use routes with JWT authentication middleware

app.use('/profiles', profileRoutes);



connectDB().then(() => {
  console.log('Database connected');

  // Middlewares and routes

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Database connection failed:', err);
});

console.log('Server setup complete');



