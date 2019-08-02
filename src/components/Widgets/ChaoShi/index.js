import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Bumen from './bumen';
import Table from './table';


const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginBottom: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  main: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  content: {
    flex: '1 0 auto',
  },
  meirixuqiu: {
    height: 400,
  },
  info: {
    marginTop: 30,
  },
  img: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const ChaoShi = ({ data }) => {
  const { zhouqi, WIPCurrent, WPIYear, WIPStd, tianshu, tianshuData } = data;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div className={classes.main}>
            <Grid container spacing={1} >
              <Grid item xs={6}>
                <h2>超时需求展示</h2>
              </Grid>
              <Grid item xs={6}>
                <Bumen />
              </Grid>
            </Grid>
            <Grid container spacing={1} >
              <Grid item xs={3}>
                <h4>周期均值：</h4>
              </Grid>
              <Grid item xs={3}>
                <h4>周期标准差：</h4>
              </Grid>
              <Grid item xs={3}>
                <h4>WIP均值：</h4>
              </Grid>
              <Grid item xs={3}>
                <h4>WIP标准差：</h4>
              </Grid>
            </Grid>
            <Table />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

ChaoShi.propTypes = {
  data: PropTypes.shape({
    zhouqi: PropTypes.string,
    WIPCurrent: PropTypes.string,
    WPIYear: PropTypes.string,
    WIPStd: PropTypes.string,
    tianshu: PropTypes.string,
    tianshuData: PropTypes.string,
  }).isRequired,
};

ChaoShi.defaultProps = {
  data: {
    zhouqi: '0',
    WIPCurrent: '0',
    WIPYear: '0',
    WIPStd: '0',
    tianshu: '5',
    tianshuData: '0',
  },
};

export default ChaoShi;
