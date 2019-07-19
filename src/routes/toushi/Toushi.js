/* eslint-disable no-trailing-spaces */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WIP from '../../components/Widgets/WIP';
import { setYaLi } from '../../actions/xuqiu';


const Toushi = ({ fetch, dispatch }) => {
  useEffect(() => {
    async function fetchData() {
      const repsAll = await fetch('/api/xuqiu/yali');
      const result = await repsAll.json();
      dispatch(setYaLi({ yali: result }));
    }
    fetchData();
  });
  return (
    <div>
      <WIP />
      <WIP />
    </div>);
};

Toushi.propTypes = {
  fetch: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Toushi);
