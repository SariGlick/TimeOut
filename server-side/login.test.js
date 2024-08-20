import request from 'supertest';
import app from '../app.js'; 
import mongoose from 'mongoose';
import Users from '../models/user.model.js';
import bcrypt from 'bcrypt';

import { connectMongo, disconnectMongo } from '../config/db.js';

beforeAll(async () => {
    await connectMongo();
});

afterAll(async () => {
    await disconnectMongo();
    await mongoose.connection.close(); // ודא שהחיבור נסגר כראוי
});


describe('POST /signIn', () => {
    let user;

    beforeAll(async () => {
        jest.setTimeout(10000); 
        // Create a user for testing
        user = new Users({
            name: 'Ela',
            email: 'ela@gmail.com',
            password: await bcrypt.hash('e1234', 10) // Hash the password
        });
        await user.save();
    });
    

    afterAll(async () => {
        // ניקוי המשתמשים אחרי הבדיקות
        await Users.deleteMany({});
    });

    it('should authenticate a user with valid credentials', async () => {
        const response = await request(app)
            .post('/signIn')
            .send({ email: 'ela@gmail.com', password: 'e1234' });

        expect(response.status).toBe(200);
        expect(response.body.user).toBeDefined();
        expect(response.body.user.email).toBe('ela@gmail.com');
        expect(response.body.user.password).toBe('****'); // בדיקה שהסיסמה אינה חשופה
        expect(response.headers['set-cookie']).toBeDefined(); // בדיקה שנוצר עוגיה
    });

    it('should fail authentication with incorrect password', async () => {
        const response = await request(app)
            .post('/signIn')
            .send({ email: 'ela@gmail.com', password: 'e1234' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Auth Failed');
    });

    it('should fail authentication for non-existing user', async () => {
        const response = await request(app)
            .post('/signIn')
            .send({ email: 'ela@gmail.com', password: 'e1234' });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Auth Failed');
    });
});
