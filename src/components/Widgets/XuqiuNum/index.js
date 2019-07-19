import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// import Label from './label';
import Today from './today';
import History from './history';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
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
}));

const XuqiuNum = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            需求数量
          </Typography>
          <div className={classes.main}>
            <Grid container spacing={3} >
              <Grid item xs={8}>
                <div className={classes.meirixuqiu}>
                  <History />
                </div>
              </Grid>
              <Grid item xs={4}>
                <Today />
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default XuqiuNum;
