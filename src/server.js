import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDom from 'react-dom/server';

import passport from './core/passport';

import App from 'components/App';
import Html from 'components/Html';

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

//Authentication
app.use(passport.initialize());

app.get('/login', passport.authenticate('github', {scrope: ['user:email']}), (req, res) => {
  res.status(200);
  res.send('login page');
});

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/', session: false}),
  (req, res) => {
    res.status(200);
    res.send(req.user);
  }
);
//test html template
app.get('/', (req, res) => {
  const data = {};
  data.title = 'title';
  data.description = 'des';
  data.children = ReactDom.renderToString(<App/>);
  data.style = "body{ color: red}";
  data.scripts = [];

  const html = ReactDom.renderToStaticMarkup(<Html {...data} />);
  res.status(200);
  res.send(`<!doctype html>${html}`);
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});