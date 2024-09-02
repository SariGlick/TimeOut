import { formatDate, getWebsites } from '../../../src/components/statistics/graphsUtils.js';

describe('FORMATDATE_FUNCTION', () => {
    it('should return format a date correctly', () => {
        const date = new Date('2024-01-15');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('2024-1-15');
    });

    it('should handle single-digit month and day values correctly', () => {
        const date = new Date('2024-09-01');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('2024-9-1');
    });

    it('should handle leap years correctly', () => {
        const date = new Date('2020-02-29');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('2020-2-29');
    });

    it('should return NaN-NaN-NaN for empty date', () => {
        const date = new Date('');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('NaN-NaN-NaN');
    });

    it('should return NaN-NaN-NaN for invalid date', () => {
        const date = new Date('2024-29-38');
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe('NaN-NaN-NaN');
    })
});

const websites = {
    data: {
        websites: [
            { name: 'Google' },
            { name: 'GitHub' }
        ]
    }
};

const users = {
    data: {
        users: [
            {
                name: "david", email: 'david@gmail.com', visitsWebsites: [
                    { websiteId: { name: 'Google' }, visitsTime: [{ visitDate: '2024-06-02', activityTime: 30 }] },
                    { websiteId: { name: 'Google' }, visitsTime: [{ visitDate: '2024-06-07', activityTime: 45 }] },
                    { websiteId: { name: 'GitHub' }, visitsTime: [{ visitDate: '2024-07-15', activityTime: 20 }] }
                ]
            }
        ]
    }
};

const user = { name: "david", email: 'david@gmail.com' };
const dateStart = formatDate(new Date('2024-06-01'));
const dateEnd = formatDate(new Date('2024-06-29'));

describe('getWebsites function', () => {
    it('should calculate total activity time for each website within the specified date range', () => {
        const result = getWebsites(websites, users, user, dateStart, dateEnd);

        expect(result).toEqual([
            { name: 'Google', color: expect.any(String), time: 30 },
            { name: 'GitHub', color: expect.any(String) }
        ]);
    });

    it('should return undefined when the websites parameter is null', () => {
        const result = getWebsites(null, users, user, dateStart, dateEnd);
        expect(result).toEqual(undefined);
    });

    it('should return undefined when all parameters are null', () => {
        const result = getWebsites(null, null, null, null, null);
        expect(result).toEqual(undefined);
    })

    it('should handle missing data fields without throwing errors', () => {
        const result = getWebsites({}, {}, {}, '2024-01-01', '2024-01-31');

        expect(result).toEqual(undefined);
    });
});


