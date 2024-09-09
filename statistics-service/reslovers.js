import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;
const url = process.env.URL;
const resolvers = {
    Query: {
        websites: async () => {
            try {
                const response = await axios.get(`${url}:${port}/websites`);
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        users: async () => {
            try {
                const response = await axios.get(`${url}:${port}/users`);
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        userByEmail: async (_, { email }) => {
            try {
                const response = await axios.get(`${url}:${port}/users/getUserByEmail/${email}`);
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    }
};

export default resolvers;
