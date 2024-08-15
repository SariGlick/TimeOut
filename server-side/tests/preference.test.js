import request from 'supertest';
import app from '../app.js';
import { connectMongo, disconnectMongo } from '../config/db.js';


describe('GET /preferences', () => {
    it('should return all preferences', async () => {
        const response = await request(app).get('/preferences');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeInstanceOf(Array);

    });
});
describe( `GET /preferences/:id` , () =>{
  it('should return  preferences by id' , async () =>{
    const id='6694e5190d8e4ee0aab3d161'
    const response = await  request(app).get(`/preferences/${id}`)
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
       })
});

describe( `POST /preferences` , () =>{
    it('should add preferences ' , async () =>{
      const response = await  request(app).post(`/preferences`).send(
        {
            "emailFrequency": "never",
            "sendNotificationTime": 67,
            "soundVoice": "06×\u009c×\u009b×\u0094 ×\u0093×\u0095×\u0093×\u0099.mp3"
       })

        expect(response.body).toBeDefined()
        expect(response.status).toBe(200)// Check if the response has an ID
        })
});

describe( `PUT /preferences/:id` , () =>{
    it('should update preferences by id' , async () =>{
        const id='6694e5190d8e4ee0aab3d161'
      const response = await  request(app).put(`/preferences/${id}`).send(
        {
            "_id": "6694e5190d8e4ee0aab3d161",
            "emailFrequency": "never",
            "sendNotificationTime": 67,
            "soundVoice": "06×\u009c×\u009b×\u0094 ×\u0093×\u0095×\u0093×\u0099.mp3"
       })
      
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        })
});

describe( `DELETE /preferences/:id` , () =>{
    it('should DELETE preferences ' , async () =>{
      const id='6694e5220d8e4ee0aab3d163'
      const response = await  request(app).delete(`/preferences/${id}`)
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        })
});