import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Detail from './detail';
import Dialog from './dialog';


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
    marginTop: 40,
  },
  img: {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


const XiaoNeng = ({ data }) => {
  const { junshi, fanwei, tianshu, zengjia, zhouqi, mean, std } = data;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            工作效能描述
          </Typography>
          <div className={classes.main}>
            <Grid container spacing={1} >
              <Grid item xs={3} className={classes.info}>
                <h3>WIP均时指数: {junshi}</h3>
                <h3>WIP均时变动范围: {fanwei}</h3>
                <h3>与{tianshu}天前相比WIP均时增加: {zengjia}</h3>
                <Dialog zhouqi={zhouqi} mean={mean} std={std} />
              </Grid>
              <Grid item xs={9}>
                <Detail />
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

XiaoNeng.propTypes = {
  data: PropTypes.shape({
    junshi: PropTypes.string,
    fanwei: PropTypes.string,
    tianshu: PropTypes.string,
    zengjia: PropTypes.string,
    zhouqi: PropTypes.string,
    mean: PropTypes.string,
    std: PropTypes.string,
  }).isRequired,
};

XiaoNeng.defaultProps = {
  data: {
    junshi: '0',
    fanwei: '0',
    tianshu: '0',
    zengjia: '0',
    zhouqi: '5',
    mean: '0',
    std: '0',
  },
};

export default XiaoNeng;
