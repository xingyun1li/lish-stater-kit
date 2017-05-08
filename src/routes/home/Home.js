import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

const Home = () => (
  <div className={ s.red }><h2>Home</h2></div>
);

export default withStyles(s)(Home);