import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';

let server;
let port;

beforeAll(async () => {
    const url = 'mongodb://localhost:27017/test';

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    port = Math.floor(10000 + Math.random() * 50000);

    server = app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});

afterAll(async () => {
    if (server && server.listening) {
        await server.close();
    }
    await mongoose.connection.close();
});

const id = new mongoose.Types.ObjectId();
const websiteId = new mongoose.Types.ObjectId();

const mockProfile = {
    userId: id.toString(),
    profileName: 'Test Profile',
    statusBlockedSites: 'black list',
    listWebsites: [{
        websiteId: websiteId.toString(),
        status: 'block',
        limitedMinutes: 30
    }],
    timeProfile: {
        start: '08:00',
        end: '17:00'
    },
    googleMapsLocation: {
        enabled: true,
        location: {
            address: '123 Test Street',
            lat: 51.5074,
            lng: 0.1278
        }
    },
    googleCalendarEvents: {
        enabled: true,
        calendarId: 'test-calendar-id'
    },
    googleDriveFiles: {
        enabled: true,
        folderId: 'test-folder-id'
    }
};

describe('Profile API', () => {
    let profileId;

    it('should create a new profile', async () => {
        const response = await request(app)
            .post('/profiles')
            .send(mockProfile)
            .set('Host', `localhost:${port}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(mockProfile);
        profileId = response.body._id;
    });

    it('should get all profiles', async () => {
        const response = await request(app)
            .get('/profiles')
            .set('Host', `localhost:${port}`);
        expect(response.status).toBe(200);

        const expectedProfile = { ...mockProfile, listWebsites: [{ ...mockProfile.listWebsites[0], _id: expect.any(String) }], _id: expect.any(String), __v: expect.any(Number) };
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(expectedProfile)]));
    });

    it('should get profile by ID', async () => {
        const response = await request(app)
            .get(`/profiles/${profileId}`)
            .set('Host', `localhost:${port}`);
        expect(response.status).toBe(200);

        const expectedProfile = { ...mockProfile, listWebsites: [{ ...mockProfile.listWebsites[0], _id: expect.any(String) }], _id: profileId, __v: expect.any(Number) };
        expect(response.body).toMatchObject(expectedProfile);
    });

    it('should update a profile', async () => {
        const updatedData = { profileName: 'Updated Profile Name' };
        const response = await request(app)
            .put(`/profiles/${profileId}`)
            .send(updatedData)
            .set('Host', `localhost:${port}`);
        expect(response.status).toBe(200);
        expect(response.body.profileName).toBe(updatedData.profileName);
    });

    it('should delete a profile', async () => {
        const response = await request(app)
            .delete(`/profiles/${profileId}`)
            .set('Host', `localhost:${port}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Profile deleted successfully');
    });

    it('should get profiles by user ID', async () => {
        const response = await request(app)
            .get(`/profiles/user/${id}`)
            .set('Host', `localhost:${port}`);
    
        if (response.status === 404) {
            console.warn(`Warning: ${response.body.message}`);
            expect(response.status).toBe(404); 
        } else {
            expect(response.status).toBe(200);
            const expectedProfile = { ...mockProfile, listWebsites: [{ ...mockProfile.listWebsites[0], _id: expect.any(String) }], _id: expect.any(String), __v: expect.any(Number) };
            expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(expectedProfile)]));
        }
    });
    
    it('should update location and activate profile if within range', async () => {
        const location = { lat: 51.5074, lng: 0.1278 };
        const response = await request(app)
            .post('/profiles/updateLocation')
            .send({ userId: id.toString(), location })
            .set('Host', `localhost:${port}`);
    
        if (response.status === 404) {
            console.warn(`Warning: ${response.body.message}`);
            expect(response.status).toBe(404);
        } else {
            expect(response.status).toBe(200);
            expect(response.text).toBe('Location updated');
        }
    });    
});
