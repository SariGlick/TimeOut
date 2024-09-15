import request from 'supertest';
import app from '../app.js'; 
import { connectMongo, disconnectMongo } from '../config/db.js'

beforeAll(async () => {
    await connectMongo();
  });
  
  afterAll(async () => {
    await disconnectMongo();
  });
  
describe('GET /', () => {
    it('should return "welcome to time out"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('welcome to time out ');
    });
});
