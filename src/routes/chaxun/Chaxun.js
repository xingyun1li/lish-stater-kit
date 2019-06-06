/* eslint-disable no-trailing-spaces */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import XuqiuNum from '../../components/Widgets/XuqiuNum';
import s from './Chaxun.css';


class Chaxun extends React.Component {
  render() {
    return (
      <XuqiuNum />
    );
  }
}

export default withStyles(s)(Chaxun);
