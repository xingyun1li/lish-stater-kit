import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;

//如果userAgent没有给定，就使用'all'
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//注册中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({entended: true}));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.end('helloworld');
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});