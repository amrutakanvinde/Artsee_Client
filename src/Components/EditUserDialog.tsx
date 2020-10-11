import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ItemDetails, Category, UserDetails } from '../Interfaces';
import { FormControl, InputLabel, Select, OutlinedInput, InputAdornment, MenuItem } from '@material-ui/core';
import APIURL from "../helpers/environment";


type propsData = {
    sessionToken: string | null,
    editUserModal: boolean,
    snackbarOpen: boolean,
    userData: UserDetails | null,
    handleClose: () => void,
    openSnackbar: (str: string) => void
}

type EditItemData = {
    email: string| undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    id: number | undefined,
    // password: string,
    role: string | undefined,
    userName: string | undefined,
}

export class EditUserDialog extends Component<propsData, EditItemData> {

    constructor(props: propsData) {
        super(props)
        console.log("Props display",this.props)
        this.state = {
            firstName: this.props.userData?.firstName,
            lastName: this.props.userData?.lastName,
            userName: this.props.userData?.userName,
            email: this.props.userData?.email,
            role: this.props.userData?.role,
            id: this.props.userData?.id
        }
    }

    handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.handleClose();
    };

    editUser = () => {

        console.log("On Edit",  this.state.role)
        if (this.props.sessionToken && this.props.userData) {

            fetch(`${APIURL}/user/${this.props.userData.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    user: {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        userName: this.state.userName,
                        email: this.state.email,
                        role: this.state.role,
                    },
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        res.json().then(err => { alert(err.error) })
                        throw new Error("fetch error");
                    }
                    else {
                        // console.log("Item edited successfully")
                        this.props.handleClose();
                        this.props.openSnackbar("success");
                    }
                })
                .catch((err) => this.props.openSnackbar("error"));
        }
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.editUserModal} onClose={() => this.handleClose} aria-labelledby="form-dialog-title"
                    BackdropProps={{ invisible: false, classes: { root: 'customBackdrop' } }}>
                    <DialogTitle id="form-dialog-title">
                        Edit User
                        </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                        </DialogContentText>
                        <TextField label="First Name" variant="outlined"
                            defaultValue={this.props.userData?.firstName}
                            onChange={e => {
                                this.setState({ firstName: e.target.value })
                            }}
                        ></TextField>
                        <br />
                        <br />

                        <TextField label="Last Name" variant="outlined"
                            defaultValue={this.props.userData?.lastName}
                            onChange={e => {
                                this.setState({ lastName: e.target.value })
                            }}
                        />
                        <br />
                        <br />
                        <TextField label="User Name" variant="outlined"
                            defaultValue={this.props.userData?.userName}
                            onChange={e => {
                                this.setState({ userName: (e.target.value) })
                            }}
                        />
                        <br />
                        <br />
                        <TextField label="Email" variant="outlined"
                            defaultValue={this.props.userData?.email}
                            onChange={e => {
                                this.setState({ email: (e.target.value) })
                            }}
                        />
                        <br />
                        <br />
                         <FormControl style={{ width: '50%' }}>
                            <InputLabel style={{ textAlign: 'right' }}>Category</InputLabel>
                            <Select 
                            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                                if(this.state.role && e.target.value){
                                this.setState({
                                    role: e.target.value as string
                            })}}} 
                            defaultValue={this.props.userData?.role}>
                                <MenuItem value={"admin"}>Admin</MenuItem>
                                <MenuItem value={"buyer"}>Buyer</MenuItem>
                                <MenuItem value={"seller"}>Seller</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>    
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={this.editUser} color="primary">
                            Edit User
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditUserDialog;
