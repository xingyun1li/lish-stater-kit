/* eslint-disable no-trailing-spaces */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Spider from '../../components/Widgets/Spider';
import s from './Home.css';


class Home extends React.Component {
  render() {
    return (
      <Spider />
    );
  }
}

export default withStyles(s)(Home);
