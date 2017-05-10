/* eslint-disable no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    user: PropTypes.object, // eslint-disable-line
  };

  render() {
    const { user } = this.props;
    if (user) {
      return (
        <h2 className={s.red}>user.name</h2>
      );
    } else {
      return (
        <h2>No user!</h2>
      );
    }
  }
}

export default withStyles(s)(Home);
