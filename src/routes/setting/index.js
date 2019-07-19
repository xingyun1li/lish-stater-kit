import React from 'react';
import Setting from './Setting';
import Layout from '../../components/Layout';

const title = '项目配置';

export default {
  path: '/setting',

  action() {
    return {
      title,
      component: <Layout title={title}><Setting /></Layout>,
    };
  },
};
