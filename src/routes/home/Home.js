/* eslint-disable no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import Spider from '../../components/Widgets/Spider';


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

export default Home;
