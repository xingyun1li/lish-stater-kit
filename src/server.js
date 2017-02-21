import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDom from 'react-dom/server';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import passport from './core/passport';
import { port, auth } from './config';

import App from './components/App';
import Html from './components/Html';

const app = express();

//如果userAgent没有给定，就使用'all'
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//注册中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({entended: true}));
app.use(bodyParser.json());

//Authentication
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
}));
app.use(passport.initialize());

app.get('/login/github', passport.authenticate('github', {scrope: ['user:email'], session: false}));

app.get('/welcome', (req, res) => {
  if(req.user) {
    res.status(200);
    res.send(`Hello, ${req.user.displayName}`);
  }else {
    res.redirect('/login/github')
  }
});

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/', session: false}),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 30; //30 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true});
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