/* eslint-disable no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Spider from '../../components/Widgets/Spider';
import s from './Home.css';


class Home extends React.Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
  };

  render() {
    const { fetch } = this.props;
    return (
      <Spider fetch={fetch} />
    );
  }
}

export default withStyles(s)(Home);
