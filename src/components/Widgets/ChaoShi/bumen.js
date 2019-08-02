import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Bumen() {
  const classes = useStyles();
  const [currBumen, setCurrBumen] = React.useState('所有部门');
  const bumens = ['信用卡部', '渠道管理部', '交易银行一部', '交易银行二部'];

  function handleChange(event) {
    setCurrBumen(event.target.value);
  }

  const items = [];
  bumens.forEach((bumen) => {
    items.push(<MenuItem key={bumen} value={bumen}>{bumen}</MenuItem>)
  });

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          value={currBumen}
          onChange={handleChange}
          displayEmpty
          name="bumen"
          className={classes.selectEmpty}
        >
          <MenuItem value="所有部门">
            <em>所有部门</em>
          </MenuItem>
          {items}
        </Select>
      </FormControl>
    </form>
  );
}
