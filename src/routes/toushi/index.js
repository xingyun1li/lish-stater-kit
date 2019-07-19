import React from 'react';
import Toushi from './Toushi';
import Layout from '../../components/Layout';

const title = '数据透视';

export default {
  path: '/toushi',

  action({ fetch }) {
    return {
      title,
      component: <Layout title={title}><Toushi fetch={fetch} /></Layout>,
    };
  },
};
