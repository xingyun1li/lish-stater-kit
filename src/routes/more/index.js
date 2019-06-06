import React from 'react';
import More from './More';
import Layout from '../../components/Layout';

const title = '更多功能';

export default {
  path: '/more',

  action() {
    return {
      title,
      component: <Layout title={title}><More /></Layout>,
    };
  },
};
