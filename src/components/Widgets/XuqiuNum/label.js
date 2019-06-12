import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  contianer: {
    height: 100,
    width: 400,
  },
}));

const Label = () => {
  const classes = useStyles();
  return (
    <div className={classes.contianer}>
      <h3>数据更新日期：2019年6月11日</h3>
      <h3>活跃需求：95单</h3>
      <h3>暂停需求：20单</h3>
    </div>
  );
};

export default Label;
