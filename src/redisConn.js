import redis from 'redis';
import { promisify } from 'util';

const client = redis.createClient({ host: '172.20.0.3', port: 6379 });

export const redisGet = promisify(client.get).bind(client);
export const redisSet = promisify(client.set).bind(client);
