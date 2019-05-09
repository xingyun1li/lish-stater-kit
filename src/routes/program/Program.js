/* eslint-disable no-trailing-spaces */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Program.css';


class Home extends React.Component {
  render() {
    return (
      <h2>程序控制</h2>
    );
  }
}

export default withStyles(s)(Home);
