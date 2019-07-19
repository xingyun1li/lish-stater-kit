import React from 'react';
import Meiri from './Meiri';
import Layout from '../../components/Layout';

export default {
  path: '/meiri',

  async action({ fetch }) {
    return {
      title: '每日需求',
      component: <Layout title="每日需求"><Meiri fetch={fetch} /></Layout>,
    };
  },
};
