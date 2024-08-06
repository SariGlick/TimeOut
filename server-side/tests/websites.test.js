import request from 'supertest';
import app from '../app.js';
import { connectMongo, disconnectMongo } from '../config/db.js';

beforeAll(async () => {
    await connectMongo(); // Connects to a database before the tests
});

afterAll(async () => {
    await disconnectMongo(); // Closes database connection after tests
});

describe('GET /websites', ()=>{

    it('should return all website', async()=>{
        const response = await request(app).get('/websites')
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body).toBeInstanceOf(Array);
    });
});
describe('GET /websites/:id',() =>{
    it('should return website by id' , async() =>{
        const id = '669cdf6dd4542df95fcee586'
        const response = await request(app).get(`/websites/${id}`)
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();

    });
});
describe('POST /websites' ,()=>{
    it('should add website', async()=>{
        const response = await request(app).post('/websites').send(
            {
                "name": "test",
                "url": "https:/test.com"
            }
        )
        expect(response.body).toBeDefined()
        expect(response.status).toBe(200)
    })
});
describe('PUT /websites/:id' ,()=>{
    it('should update websites',async()=>{
        const id = '66b259f6ce17f1a868e4a06f'
        const response = await request(app).put(`/websites/${id}`).send(
            {
                "name": "Glassdor",
                "url": "https:/glassdor.com"
            }
        )
        expect(response.body).toBeDefined()
        expect(response.status).toBe(200)
        
    })
});
describe('DELETE /websites/:id' ,()=>{
    it('should delete websites' ,async ()=>{
        const id ='66b25a22407a138f4ba559e0'
        const response = await request(app).delete(`/websites/${id}`)
        expect(response.status).toBe(204);
        expect(response.body).toBeDefined();
    })
});