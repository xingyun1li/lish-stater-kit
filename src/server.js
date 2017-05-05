import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDom from 'react-dom/server';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import PrettyError from 'pretty-error';

import router from './router';
import ErrorPageWithoutStyle from './routes/error/ErrorPage';

import passport from './core/passport';
import { port, auth } from './config';

import Html from './components/Html';
import assets from './assets.json';

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
    res.redirect('/');
  }
);

// app.get('/', (req, res) => {
//   const data = {};
//   data.title = 'title';
//   data.description = 'des';
//   data.scripts = [
//     assets.vendor.js,
//     assets.client.js
//   ];
//
//   const html = ReactDom.renderToStaticMarkup(<Html {...data} />);
//   res.status(200);
//   res.send(`<!doctype html>${html}`);
// });

app.get('*', async (req, res, next) => {
  const route = await router.resolve({
    path: req.path,
    query: req.query,
  });
  if (route.redirect) {
    res.redirect(route.status || 302, route.redirect);
    return;
  }
  const data = {...route};
  data.children = ReactDom.renderToString(
    route.component
  );
  data.description = 'des';
  data.scripts = [
    assets.vendor.js,
    assets.client.js
  ];

  const html = ReactDom.renderToStaticMarkup(<Html {...data} />);
  res.status(200);
  res.send(`<!doctype html>${html}`);
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  const html = ReactDom.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
    >
    {ReactDom.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});