import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDom from 'react-dom/server';
import expressJwt from 'express-jwt';
import PrettyError from 'pretty-error';
import { redisGet } from './redisConn';
import router from './router';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import createFetch from './createFetch';
import configureStore from './store/configureStore';
import setRuntimeVariable from './actions/runtime';
import setSpiderRunning from './actions/spider';

import passport from './passport';
import config from './config';

import Html from './components/Html';
import App from './components/App';
import SpiderRoute from './api/spider';
import XuqiuRoute from './api/xuqiu';
// eslint-disable-next-line import/no-unresolved
import assets from './assets.json';

const app = express();

// 如果userAgent没有给定，就使用'all'
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// 注册中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressJwt({
  secret: config.auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));
app.use(passport.initialize());

app.use('/api/spider', SpiderRoute);
app.use('/api/xuqiu', XuqiuRoute);

app.set('trust proxy', true);

app.get('*', async (req, res, next) => {
  try {
    const css = new Set();
    const fetch = createFetch({
      baseUrl: config.api.serverUrl,
      cookie: req.header.cookie,
    });

    const initialState = {
      user: req.user || null,
      xuqiu: {
        yali: {
          mean: '0',
          std: '0',
          last: '0',
        },
      },
    };

    const store = configureStore(initialState, {
      fetch,
      //  I should not use `history` on server.. but how I do redirection? follow universal-router
    });

    const isSpiderRunning = await redisGet('spider:isRunning');
    // const spiderStatus = null;

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));
    if (isSpiderRunning === 'false') {
      store.dispatch(setSpiderRunning({
        isSpiderRunning: false,
      }));
    } else {
      store.dispatch(setSpiderRunning({
        isSpiderRunning: true,
      }));
    }

    const context = {
      insertCss: (...styles) => {
        //  eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      fetch,
      store,
      storeSubscription: null,
    };
    const route = await router.resolve({
      path: req.path,
      query: req.query,
// eslint-disable-next-line max-len
      //  Any arbitrary data can be passed to the router.resolve() method, that becomes available inside action functions.
      fetch,
      store,
    });
    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }
    const data = { ...route };
    data.children = ReactDom.renderToString(
      <App context={context}>
        { route.component }
      </App>,
    );
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };
    data.description = 'des';
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    data.styles = [
      { id: 'css', cssText: [...css].join('') },
    ];
    const html = ReactDom.renderToStaticMarkup(<Html {...data} />);
    res.status(200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

// 错误处理
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res) => {
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

app.listen(config.port, () => {
// eslint-disable-next-line no-console
  console.log(`The server is running at http://localhost:${config.port}/`);
});
