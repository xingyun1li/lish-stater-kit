/* eslint-disable max-len */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import NoSsr from '@material-ui/core/NoSsr';
import { connect } from 'react-redux';

const History = ({ all }) => {
  const [date, data, ZTData] = all;
  const option = {
    xAxis: {
      type: 'category',
      data: date,
    },
    legend: {
      data: ['活跃需求', '暂停需求'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: '日期：{b0}<br />{a0}：{c0}<br />{a1}: {c1}',
    },
    yAxis: {
      type: 'value',
    },
    dataZoom: [{
      type: 'slider',
      start: 88,
      end: 100,
    }],
    series: [{
      name: '活跃需求',
      data,
      lineStyle: {
        color: '#81BC9E',
      },
      areaStyle: {
        color: '#A0CCB6',
      },
      type: 'line',
    }, {
      name: '暂停需求',
      data: ZTData,
      lineStyle: {
        color: '#C45759',
      },
      areaStyle: {
        color: '#C45759',
      },
      type: 'line',
    }],
  };
  return (
    <NoSsr>
      <ReactEcharts
        option={option}
      />
    </NoSsr>
  );
};

History.propTypes = {
  all: PropTypes.arrayOf(
    PropTypes.array,
    PropTypes.array,
    PropTypes.array,
  ),
};

History.defaultProps = {
  all: [[], [], []],
};

const mapStateToProps = state => ({
  all: state.xuqiu.xuqiuAll,
});

export default connect(mapStateToProps)(History);
