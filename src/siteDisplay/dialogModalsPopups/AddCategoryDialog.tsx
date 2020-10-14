import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ItemDetails, Category } from '../../Interfaces';
import { FormControl, InputLabel, Select, OutlinedInput, InputAdornment, MenuItem } from '@material-ui/core';
import APIURL from "../../helpers/environment";


type propsData = {
    sessionToken: string | null,
    addCategoryModal: boolean,
    snackbarOpen: boolean,
    handleClose: () => void,
    openSnackbar: (str: string) => void
}

type AddCategoryData = {
   categoryName: string
}

export class AddCategoryDialog extends Component<propsData, AddCategoryData> {

    constructor(props: propsData) {
        super(props)
        this.state = {
            categoryName: ''
        }
    }

    handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.handleClose();
    };

    addCategory = () => {
        if (this.props.sessionToken) {

            fetch(`${APIURL}/category/`, {
                method: "POST",
                body: JSON.stringify({
                    category: {
                        categoryName: this.state.categoryName
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
                        console.log("Category added successfully")
                        this.props.openSnackbar("success");
                        this.props.handleClose();
                    }
                    //Add the number on cart item
                })
                .catch((err) => this.props.openSnackbar("error"));
        }
    }

    render() {

        return (
            <div>
                <Dialog open={this.props.addCategoryModal} onClose={() => this.handleClose} aria-labelledby="form-dialog-title"
                    BackdropProps={{ invisible: false, classes: { root: 'customBackdrop' } }}>
                    <DialogTitle id="form-dialog-title">
                        Add New Category
                        </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                        </DialogContentText>
                        <TextField label="Name" variant="outlined"
                            // value={this.state.itemName}
                            onChange={e => {
                                this.setState({ categoryName: e.target.value })
                            }}
                        />
                        <br />
                        <br />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={this.addCategory} color="primary">
                            Add Category
                            </Button>
                    </DialogActions>
                </Dialog>


            </div>
        );
    }
}

export default AddCategoryDialog;