import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';


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


const WIP = ({ mean, std, last, percent, tuijian }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            近30天工作压力描述
          </Typography>
          <div className={classes.main}>
            <Grid container spacing={1} >
              <Grid item xs={7}>
                <div className={classes.meirixuqiu}>
                  <img className={classes.img} src="/api/xuqiu/wip_hist.png" alt="wip_hist" />
                </div>
              </Grid>
              <Grid item xs={5} className={classes.info}>
                <h4>30天日均WIP均值: {mean}</h4>
                <h4>30天日均WIP标准差: {std}</h4>
                <h4>最近30天WIP均值: {last}</h4>
                <h4>复现概率: {percent}</h4>
                <h4>对比推荐工作量: {tuijian}</h4>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

WIP.propTypes = {
  mean: PropTypes.string,
  std: PropTypes.string,
  last: PropTypes.string,
  percent: PropTypes.string,
  tuijian: PropTypes.string,
};

WIP.defaultProps = {
  mean: '0',
  std: '0',
  last: '0',
  percent: '0',
  tuijian: '0',
};

const mapStateToProps = state => ({
  mean: state.xuqiu.yali.mean,
  std: state.xuqiu.yali.std,
  last: state.xuqiu.yali.last,
  percent: state.xuqiu.yali.percent,
  tuijian: state.xuqiu.yali.tuijian,
});

export default connect(mapStateToProps)(WIP);
