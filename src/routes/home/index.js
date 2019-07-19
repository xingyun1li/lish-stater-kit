import React from 'react';
import Meiri from '../meiri/Meiri';
import Layout from '../../components/Layout';

const title = '每日需求';

export default {
  path: '/',

  async action({ fetch }) {
    return {
      title,
      component: <Layout title={title}><Meiri fetch={fetch} /></Layout>,
    };
  },
};
