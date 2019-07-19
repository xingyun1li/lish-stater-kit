/* eslint-disable max-len */
import express from 'express';
import { countBy, map, unzip } from 'lodash';
import { query } from '../mysqlConn';
import { redisGet } from '../redisConn';

const router = express.Router();

router.get('/all', async (req, res) => {
  const msg = await query('select riqi, hy_num, zt_num from num');
  const arr = JSON.parse(JSON.stringify(msg));
  const all = unzip(map(arr, obj => [obj.riqi, obj.hy_num, obj.zt_num]));
  res.send({ all });
});

router.get('/current', async (req, res) => {
  const msg = await query('select x_zhipaigei from meirixuqiu where x_riqi = (select x_riqi from meirixuqiu order by x_riqi desc limit 1)');
  const arr = JSON.parse(JSON.stringify(msg));
  const result = countBy(arr, obj => obj.x_zhipaigei);
  const current = map(result, (value, key) => ({
    name: key,
    value,
  }));
  res.send({ current });
});

router.get('/wip_hist.png', async (req, res) => {
  const data = await redisGet('yali:wip_hist');
  const img = new Buffer(data, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length,
    'Cache-Control': 'no-cache',
  });
  res.end(img);
});

router.get('/yali', async (req, res) => {
  const mean = await redisGet('yali:mean');
  const std = await redisGet('yali:std');
  const last = await redisGet('yali:last30');
  const percent = await redisGet('yali:percent');
  const tuijian = await redisGet('yali:tuijian');
  const result = {
    mean: parseFloat(mean).toFixed(2),
    std: parseFloat(std).toFixed(2),
    last: parseFloat(last).toFixed(2),
    percent: parseFloat(percent).toFixed(2),
    tuijian: parseFloat(tuijian).toFixed(2),
  };
  res.send(JSON.stringify(result));
});

export default router;
