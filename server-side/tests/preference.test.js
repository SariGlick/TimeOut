import request from 'supertest';
import app from '../app.js';
import { connectMongo, disconnectMongo } from '../config/db.js';

beforeAll(async () => {
    await connectMongo(); // Connects to a database before the tests
});

afterAll(async () => {
    await disconnectMongo(); // Closes database connection after tests
});

describe('GET /preferences', () => {
    it('should return all preferences', async () => {
        const response = await request(app).get('/preferences');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeInstanceOf(Array);
    });
});
