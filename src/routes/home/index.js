import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

const title = '首页';

export default {
  path: '/',

  action({ fetch }) {
    return {
      title,
      component: <Layout title={title}><Home fetch={fetch} /></Layout>,
    };
  },
};
