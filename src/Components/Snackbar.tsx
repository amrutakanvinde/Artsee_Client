import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

type propsData = {
    handleOpen: () => void,
    handleClose: () => void,
    modalOpen: boolean 
}

export const CustomizedSnackbars: FunctionComponent<propsData> = (props) => {

  const classes = useStyles();
 
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.handleClose();
  };

  return (
    <div style ={{
        width: '100%',
        // '& > * + *': {
        marginTop: '2px'
        // }
    }}>
      <Snackbar open={props.modalOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
