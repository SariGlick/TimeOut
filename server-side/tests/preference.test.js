import request from 'supertest';
import app from '../app.js';
import { connectMongo, disconnectMongo } from '../config/db.js'
beforeAll(async () => {
    await connectMongo(); // Connects to a database before the tests
  });
  
  afterAll(async () => {
    await disconnectMongo(); // Closes database connection after tests
  });

  describe('get all preference /' ,()=>{
      it('should return all preference')
    
  })