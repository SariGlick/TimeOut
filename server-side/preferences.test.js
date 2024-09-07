// preferences.test.js
import request from 'supertest';
import app from './server'; // נניח ש-server.js הוא הקובץ עם השרת שלך
import mongoose from 'mongoose';
import Preference from './models/preference.model'; // או הנתיב הנכון למודל שלך

beforeAll(async () => {
  // חיבור למסד הנתונים לפני הרצת הטסטים
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // סגירת החיבור למסד הנתונים אחרי כל הטסטים
  await mongoose.connection.close();
});

describe('Preferences API', () => {
  let preferenceId;

  it('should create a new preference', async () => {
    const response = await request(app)
      .post('/api/preferences')
      .send({
        emailFrequency: 'daily',
        sendNotificationTime: 15,
        soundVoice: 'newSound.mp3',
        timeZone: 'PST',
        messagesCount: 5,
        language: 'es',
        inboxMessages: 'group by read',
        messageDisplay: 'full messages',
        dateFormat: 'MM-DD-YYYY',
        displayIncomeMessages: true,
        displayBrowsingTimeLimit: true,
      });
      
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    
    preferenceId = response.body._id; // לשימוש בטסטים נוספים
  });

  it('should retrieve a preference by ID', async () => {
    const response = await request(app)
      .get(`/api/preferences/${preferenceId}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', preferenceId);
    expect(response.body).toHaveProperty('emailFrequency', 'daily');
  });

  it('should update a preference', async () => {
    const response = await request(app)
      .put(`/api/preferences/${preferenceId}`)
      .send({
        emailFrequency: 'weekly',
        messagesCount: 10,
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('emailFrequency', 'weekly');
    expect(response.body).toHaveProperty('messagesCount', 10);
  });

  it('should delete a preference', async () => {
    const response = await request(app)
      .delete(`/api/preferences/${preferenceId}`);
    
    expect(response.statusCode).toBe(204);
    
    const getResponse = await request(app)
      .get(`/api/preferences/${preferenceId}`);
    
    expect(getResponse.statusCode).toBe(404);
  });
});
