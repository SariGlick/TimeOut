import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const url = process.env.URL;
const resolvers = {
    Query: {
        websites: async () => {
            try {
                const response = await axios.get(`${url}:${port}/websites/websites`);
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        users: async () => {
            try {
                const response = await axios.get(`${url}:${port}/users/users`);
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        profile: async () => {
            try {
                const response = await axios.get(`${url}:${port}/profiles/profiles`);
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        visitedWebsites: async () => {
            try {
                const response = await axios.get(`${url}:${port}/vistedWebsite/vistedWebsite`);
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        preferences: async () => {
            try {
                const response = await axios.get(`${url}:${port}/preferences/preferences`);
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    }
};

export default resolvers;
