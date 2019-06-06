import redis from 'redis';
import { promisify } from 'util';
import config from './config';

const client = redis.createClient({
  host: config.redisConf.host,
  port: config.redisConf.port,
});

export const redisGet = promisify(client.get).bind(client);
export const redisSet = promisify(client.set).bind(client);
