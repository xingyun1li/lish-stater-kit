import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import setSpiderRunning from '../../../actions/spider';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(1),
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const Spider = ({ isSpiderRunning, runSpider, stopSpider }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Redmine爬虫
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {isSpiderRunning ?
            <Button variant="contained" color="primary" disabled className={classes.button}>
              运行中...
            </Button> :
            <Button variant="contained" color="primary" onClick={runSpider} className={classes.button}>
              启动
            </Button>
          }

          {isSpiderRunning ?
            <Button variant="contained" color="secondary" onClick={stopSpider} className={classes.button}>
              终止
            </Button> :
            <Button variant="contained" color="primary" disabled className={classes.button}>
              终止
            </Button>
          }
        </div>
      </div>
    </Card>
  );
};

Spider.propTypes = {
  isSpiderRunning: PropTypes.bool.isRequired,
  runSpider: PropTypes.func.isRequired,
  stopSpider: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSpiderRunning: state.spider.isSpiderRunning,
});

const mapDispatchToProps = (dispatch, { fetch }) => ({
  runSpider: async () => {
    const resp = await fetch('/api/spider/start');
    const { result } = await resp.json();
    if (result) {
      dispatch(setSpiderRunning({ isSpiderRunning: true }));
    } else {
      dispatch(setSpiderRunning({ isSpiderRunning: false }));
    }
  },
  stopSpider: async () => {
    const resp = await fetch('/api/spider/stop');
    const { result } = await resp.json();
    if (result) {
      dispatch(setSpiderRunning({ isSpiderRunning: false }));
    } else {
      dispatch(setSpiderRunning({ isSpiderRunning: true }));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Spider);
