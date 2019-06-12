/* eslint-disable no-trailing-spaces,semi,no-console */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import XuqiuNum from '../../components/Widgets/XuqiuNum';
import { setXuqiuAll, setXuqiuCurrent } from '../../actions/xuqiu';


const Chaxun = ({ fetch, dispatch }) => {
  useEffect(() => {
    async function fetchData() {
      const repsAll = await fetch('/api/xuqiu/all');
      const { all } = await repsAll.json();
      dispatch(setXuqiuAll({ xuqiuAll: all }));
      const repsCurrent = await fetch('/api/xuqiu/current');
      const { current } = await repsCurrent.json();
      dispatch(setXuqiuCurrent(({ xuqiuCurrent: current })))
    }
    fetchData();
  });
  return (
    <XuqiuNum />
  );
};

Chaxun.propTypes = {
  fetch: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Chaxun);
