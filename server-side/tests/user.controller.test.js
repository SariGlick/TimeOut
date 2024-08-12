
import express from 'express';
import request from 'supertest';
import { addUser, getCode, getByEmail } from '../controllers/user.controller.js';
import Users from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { messages } from '../controllers/messages.js';

const app = express();
app.use(express.json());
app.post('/addUser', addUser);
app.get('/getCode', getCode);
app.get('/user/:email', getByEmail);

describe('User Controller Tests', () => {
  
  beforeEach(() => {
    jest.clearAllMocks(); // נקה את כל החיקויים לפני כל טסט
  });

  // בדיקות עבור POST /addUser
  describe('POST /addUser', () => {

    it('should return 200 if user is successfully registered with Google ID', async () => {
      jest.spyOn(Users.prototype, 'save').mockResolvedValue(true);

      const res = await request(app)
        .post('/addUser')
        .send({
          name: 'John Doe',
          email: 'john.doe@example.com',
          googleId: '12345'
        });

      expect(res.status).toBe(200);
      expect(res.text).toBe(messages.success.USER_REGISTERED);
    });

    it('should return 200 if user is successfully registered with password', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(Users.prototype, 'save').mockResolvedValue(true);

      const res = await request(app)
        .post('/addUser')
        .send({
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.text).toBe(messages.success.USER_REGISTERED);
    });

    it('should return 400 if neither googleId nor password is provided', async () => {
      const res = await request(app)
        .post('/addUser')
        .send({
          name: 'John Doe',
          email: 'john.doe@example.com'
        });

      expect(res.status).toBe(400);
      expect(res.text).toBe(messages.error.INVALID_CREDENTIALS);
    });

    it('should return 500 if there is an error saving the user', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(Users.prototype, 'save').mockRejectedValue(new Error('Save failed'));

      const res = await request(app)
        .post('/addUser')
        .send({
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(500);
      expect(res.text).toBe(messages.error.INTERNAL_SERVER_ERROR);
    });

    it('should return 400 if user registration fails', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(Users.prototype, 'save').mockResolvedValue(false);

      const res = await request(app)
        .post('/addUser')
        .send({
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(400);
      expect(res.text).toBe(messages.error.REQ_PASS);
    });

    it('should return 500 on catch block error', async () => {
      jest.spyOn(bcrypt, 'hash').mockRejectedValue(new Error('Hashing failed'));

      const res = await request(app)
        .post('/addUser')
        .send({
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(500);
      expect(res.text).toBe(messages.error.INTERNAL_SERVER_ERROR);
    });
  });

  // בדיקות עבור GET /getCode
  describe('GET /getCode', () => {

    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .get('/getCode')
        .query({ password: 'password123' }); // חסר email

      expect(res.status).toBe(400);
      expect(res.text).toBe(messages.error.REQ_EMAIL);
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .get('/getCode')
        .query({ email: 'test@example.com' }); // חסר password

      expect(res.status).toBe(400);
      expect(res.text).toBe(messages.error.REQ_PASS);
    });

    it('should return 200 if user is found and credentials are correct', async () => {
      jest.spyOn(Users, 'findOne').mockResolvedValue({ email: 'test@example.com' });

      const res = await request(app)
        .get('/getCode')
        .query({ email: 'test@example.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.text).toBe(messages.message.SEND_EMAIL + 'test@example.com');
    });

    it('should return 404 if user is not found', async () => {
      jest.spyOn(Users, 'findOne').mockResolvedValue(null);

      const res = await request(app)
        .get('/getCode')
        .query({ email: 'test@example.com', password: 'password123' });

      expect(res.status).toBe(404);
      expect(res.text).toBe(messages.error.USER_NOT_FOUND);
    });

    it('should return 500 if there is a server error', async () => {
      jest.spyOn(Users, 'findOne').mockRejectedValue(new Error('Internal error'));

      const res = await request(app)
        .get('/getCode')
        .query({ email: 'test@example.com', password: 'password123' });

      expect(res.status).toBe(500);
      expect(res.text).toBe(messages.error.INTERNAL_SERVER_ERROR);
    });
  });

  // בדיקות עבור GET /user/:email
  describe('GET /user/:email', () => {

    it('should return 200 and user data if user is found', async () => {
      const mockUser = { email: 'test@example.com', name: 'Test User' };
      jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);

      const res = await request(app).get('/user/test@example.com');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it('should return 404 if user is not found', async () => {
      jest.spyOn(Users, 'findOne').mockResolvedValue(null);

      const res = await request(app).get('/user/nonexistent@example.com');

      expect(res.status).toBe(404);
      expect(res.text).toBe(messages.error.EMAIL_NOT_FOUND);
    });

    it('should return 500 if there is a database error', async () => {
      jest.spyOn(Users, 'findOne').mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/user/test@example.com');

      expect(res.status).toBe(500);
      expect(res.text).toBe(messages.error.INTERNAL_SERVER_ERROR);
    });
  });
});

