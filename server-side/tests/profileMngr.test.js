import activeProfile from '../profileMngr.js';
import { getUserById } from '../controllers/user.controller.js';

jest.mock('../controllers/user.controller.js');

describe('activeProfile function', () => {
    const userId = '12345';
    const user = {
        preferences: {
            timeZone: 'America/New_York',
        },
        profiles: [
            {
                listWebsites: [
                    {
                        limitedTimes: [
                            {
                                start: new Date('2022-01-01T09:00:00.000Z'),
                                end: new Date('2022-01-01T17:00:00.000Z')
                            }]
                    },
                    {
                        limitedTimes: [
                            {
                                start: new Date('2022-01-01T18:00:00.000Z'),
                                end: new Date('2022-01-01T20:00:00.000Z')
                            }]
                    }]
            },
            {
                listWebsites: [
                    {
                        limitedTimes: [
                            {
                                start: new Date('2022-01-01T10:00:00.000Z'),
                                end: new Date('2022-01-01T12:00:00.000Z')
                            }],
                    }],
            },
        ]
    };

    const userId2 = '12345789';
    const user2 = {
        preferences: {
            timeZone: 'America/New_York',
        },
        profiles: []
    };
    it('should return active profiles for a given user', async () => {
        getUserById.mockResolvedValue(user);

        const result = await activeProfile(userId);
        expect(result).toHaveLength(2);
    });

    it('should return an empty array when user have an empty array of profiles', async () => {
        getUserById.mockResolvedValue(user2);

        const result = await activeProfile(userId2);
        expect(result).toEqual([]);
    });

    it('should throw an error if getUserById fails', async () => {
        const error = new Error('Failed to get user');

        getUserById.mockRejectedValue(error);

        await expect(activeProfile(userId)).rejects.toThrow(error);
    });
});