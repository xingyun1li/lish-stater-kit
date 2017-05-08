import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './notFound';

const title = 'NotFound';

export default {
  path: '*',
  action() {
    return {
      title,
      component: <Layout><NotFound title={title} /></Layout>,
      tatus: 404,
    };
  },
};
