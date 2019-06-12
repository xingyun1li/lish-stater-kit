import React from 'react';
import Chaxun from './Chaxun';
import Layout from '../../components/Layout';

export default {
  path: '/chaxun',

  async action({ fetch }) {
    return {
      title: '查询服务',
      component: <Layout title="查询服务"><Chaxun fetch={fetch} /></Layout>,
    };
  },
};
