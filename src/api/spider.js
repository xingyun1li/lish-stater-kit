import express from 'express';
import { redisSet } from '../redisConn';

const router = express.Router();

router.get('/start', async (req, res) => {
  const result = await redisSet('spider:isRunning', true);
  if (result === 'OK') {
    res.send({ result: true });
  }
});

router.get('/stop', async (req, res) => {
  const result = await redisSet('spider:isRunning', false);
  if (result === 'OK') {
    res.send({ result: true });
  }
});

export default router;
