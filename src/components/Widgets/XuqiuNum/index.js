import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';

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
  meirixuqiu: {
    width: 600,
    height: 400,
  },
}));

const XuqiuNum = () => {
  const classes = useStyles();
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
    }],
  };
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            需求数量
          </Typography>
          <NoSsr>
            <div className={classes.meirixuqiu}>
              <ReactEcharts
                option={option}
              />
            </div>
          </NoSsr>
        </CardContent>
      </div>
    </Card>
  );
};

export default XuqiuNum;
