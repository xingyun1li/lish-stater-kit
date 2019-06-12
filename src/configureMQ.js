import { promisify } from 'util';
import amqp from 'amqplib/callback_api';

const PromiseConnect = promisify(amqp.connect).bind(amqp);

async function configureMQ(ip, port) {
  const url = `amqp://${ip}:${port}`;
  const connection = await PromiseConnect(url);
  const channel = await connection.createChannel();
  return channel;
}

export default configureMQ('localhost', 32791);
