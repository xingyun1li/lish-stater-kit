import React from 'react';
import NotFound from './notFound';

const title = 'NotFound';

export default {
  path: '*',
  action() {
    return {
      title,
      component: <NotFound/>,
      tatus: 404,
    };
  },
};