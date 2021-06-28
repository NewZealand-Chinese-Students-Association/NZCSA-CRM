import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
  Button
} from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import Controls from './controls/Controls';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(0),
    position: 'absolute',
    top: theme.spacing(0)
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center'
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button variant="contained" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
          No
        </Button>
        <Button variant="contained" color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
