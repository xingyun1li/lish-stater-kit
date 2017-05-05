import React from 'react';
import Home from './home';

export default {
  path: '/',

  action() {
    return{
      title: 'home',
      component: <Home/>,
    };
  },
};