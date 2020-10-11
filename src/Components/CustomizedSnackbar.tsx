import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type propsData = {
    // handleOpen: () => void,
    snackbarOpen: boolean,
    severity: string, 
    handleClose: () => void,
}

export const CustomizedSnackbars: FunctionComponent<propsData> = (props) => {

 
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.handleClose();
  };

  const severity = props.severity === "success" ? "success": "error";

  const message = props.severity === "success" ? "Operation completed successfully": "Error executing request";

  return (
    <div style ={{
        width: '100%',
        // '& > * + *': {
        marginTop: '2px'
        // }
    }}>
      <Snackbar open={props.snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
