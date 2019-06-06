import React from 'react';
import Program from './Program';
import Layout from '../../components/Layout';

const title = '程序控制';

export default {
  path: '/program',

  action() {
    return {
      title,
      component: <Layout title={title}><Program /></Layout>,
    };
  },
};
