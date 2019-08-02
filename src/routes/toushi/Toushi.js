/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WIP from '../../components/Widgets/WIP';
import XiaoNeng from '../../components/Widgets/XiaoNeng';
import ChaoShi from '../../components/Widgets/ChaoShi';
import { setYaLi, setXuqiuAll } from '../../actions/xuqiu';


const Toushi = ({ fetch, dispatch }) => {
  const initXiaoNeneg = {
    junshi: '0',
    fanwei: '0',
    tianshu: '5',
    zengjia: '0',
    zhouqi: '0',
    mean: '0',
    std: '0',
  };
  const [xiaoNeng, setXiaoNeng] = useState(initXiaoNeneg);
  useEffect(() => {
    async function fetchData() {
      const repsAll = await fetch('/api/xuqiu/yali');
      const result = await repsAll.json();
      dispatch(setYaLi({ yali: result }));
      const resp = await fetch('/api/xuqiu/all');
      const { all } = await resp.json();
      dispatch(setXuqiuAll({ xuqiuAll: all }));
      const respXiaoneg = await fetch('/api/xuqiu/xiaoneng');
      const xiaoneng = await respXiaoneg.json();
      setXiaoNeng(xiaoneng);
    }
    fetchData();
  }, []);
  return (
    <div>
      <WIP />
      <XiaoNeng data={xiaoNeng} />
      <ChaoShi data={xiaoNeng} />
    </div>);
};

Toushi.propTypes = {
  fetch: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Toushi);
