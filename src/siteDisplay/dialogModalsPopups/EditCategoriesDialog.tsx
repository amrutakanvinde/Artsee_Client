import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ItemDetails, Category, UserDetails } from '../../Interfaces';
import { FormControl, InputLabel, Select, OutlinedInput, InputAdornment, MenuItem } from '@material-ui/core';
import APIURL from "../../helpers/environment";


type propsData = {
    sessionToken: string | null,
    editCategoryModal: boolean,
    snackbarOpen: boolean,
    categoryData: Category,
    handleClose: () => void,
    openSnackbar: (str: string) => void
}

type EditCategoriesData = {
    categoryName: string | undefined,
    id: number | undefined,
}

export class EditCategoriesDialog extends Component<propsData, EditCategoriesData> {

    constructor(props: propsData) {
        super(props)
        console.log("Props display", this.props)
        this.state = {
            categoryName: this.props.categoryData.categoryName,
            id: this.props.categoryData.id
        }
    }

    handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.handleClose();
    };

    editCategory = () => {
        if (this.props.sessionToken && this.props.categoryData) {

            fetch(`${APIURL}/category/${this.props.categoryData.id}`, {
                method: "PUT",
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
                        // console.log("Category edited successfully")
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
                <Dialog open={this.props.editCategoryModal} onClose={() => this.handleClose} aria-labelledby="form-dialog-title"
                    BackdropProps={{ invisible: false, classes: { root: 'customBackdrop' } }}>
                    <DialogTitle id="form-dialog-title">
                        Edit Category
                        </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                        </DialogContentText>
                        <TextField label="First Name" variant="outlined"
                            defaultValue={this.props.categoryData.categoryName}
                            onChange={e => {
                                this.setState({ categoryName: e.target.value })
                            }}
                        ></TextField>
                        <br />
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={this.editCategory} color="primary">
                            Edit Category
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditCategoriesDialog;
