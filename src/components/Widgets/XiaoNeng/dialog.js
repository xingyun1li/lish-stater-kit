import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = ({ zhouqi, mean, std }) => {
  const [open, setOpen] = React.useState(false);
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        查看详情
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'详情信息'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3>平均处理周期： {zhouqi}</h3>
            <h3>一年内WIP均值：{mean}</h3>
            <h3>一年内WIP标准差：{std}</h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.propTypes = {
  zhouqi: PropTypes.string.isRequired,
  mean: PropTypes.string.isRequired,
  std: PropTypes.string.isRequired,
};

AlertDialog.defaultProps = {
  zhouqi: '0',
  mean: '0',
  std: '0',
};

export default AlertDialog;

