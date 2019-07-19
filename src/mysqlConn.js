/* eslint-disable import/prefer-default-export */
import mysql from 'mysql';
import { promisify } from 'util';
import config from './config';

const pool = mysql.createPool(config.mysqlConf);
export const query = promisify(pool.query).bind(pool);
