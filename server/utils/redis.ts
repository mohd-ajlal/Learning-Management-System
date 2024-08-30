import { Redis } from 'ioredis';
require('dotenv').config();

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log(`Redis Connected`);
        return new Redis(process.env.REDIS_URL); // Properly instantiate Redis client
    }

    throw new Error("Redis URL not found || Redis connection failed");
}



export const redis = redisClient(); // Assign the Redis client instance

