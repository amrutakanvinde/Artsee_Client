import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type propsData = {
    // sessionToken: string | null,
    confirmationRoleModal: boolean,
    // snackbarOpen: boolean,
    handleClose: () => void,
    handleRoleChange: () => void,
    // openSnackbar: (str: string) => void
}

export class ConfirmationRoleDialog extends Component<propsData, {}> {

    constructor(props: propsData) {
        super(props)
    }

    handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.handleClose();
    };

    render() {
        return (
            <div>
                <Dialog open={this.props.confirmationRoleModal} onClose={() => this.handleClose} aria-labelledby="form-dialog-title"
                    BackdropProps={{ invisible: false, classes: { root: 'customBackdrop' } }}>
                    <DialogTitle id="form-dialog-title">
                        Confirm
                        </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Are you sure you want to grant admin rights to this user?
                        </DialogContentText>
                        
                    </DialogContent>    
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={this.props.handleRoleChange} color="primary">
                            Yes
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmationRoleDialog;
