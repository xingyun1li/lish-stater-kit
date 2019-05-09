import redis from 'redis'
import { promisify } from 'util';

const client = redis.createClient({ port: 8000 });

export const redisGet = promisify(client.get).bind(client);
export const redisSet = promisify(client.set).bind(client);
