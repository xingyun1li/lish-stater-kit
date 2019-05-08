import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

export default {
  path: '/',

  action() {
    return {
      title: 'home',
      component: <Layout title="首页"><Home /></Layout>,
    };
  },
};
