import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ItemDetails, Categories } from '../Interfaces';
import { FormControl, InputLabel, Select, OutlinedInput, InputAdornment, MenuItem } from '@material-ui/core';
import APIURL from "../helpers/environment";


type propsData = {
    sessionToken: string | null,
    addItemModal: boolean,
    categories: Categories
    handleClose: () => void,
}

type AddItemData = {
}

export class AddItemDialog extends Component<propsData, AddItemData> {
    constructor(props:propsData) {
        super(props)
        this.state = {
           
        }
    }


    handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.handleClose();
    };

    mapCategory = () => {
        // let arr = [];
        // console.log(this.props.categ)
        // // for (let i = 1; i <= this.props.categories; i++) {
        // //     arr.push(<MenuItem value={i}>{i}</MenuItem>)
        // // }
        // return arr;
    }

    render() {
        return (
            <div>

                <Dialog open={this.props.addItemModal} onClose={() => this.handleClose} aria-labelledby="form-dialog-title"
                    BackdropProps={{ invisible: false, classes: { root: 'customBackdrop' } }}>
                    <DialogTitle id="form-dialog-title">
                        Add New Item
                        </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                        </DialogContentText>
                        <TextField label="Name" variant="outlined"
                        // onChange={e => {
                        //     this.setState({ email: e.target.value })
                        // }} 
                        />
                        <br />
                        <br />
                    
                        <TextField label="Description" variant="outlined"
                        // onChange={e => {
                        //     this.setState({ password: e.target.value })
                        // }} 
                        />
                        <br />
                        <br />
                        <TextField label="Quantity" variant="outlined"
                        // onChange={e => {
                        //     this.setState({ password: e.target.value })
                        // }} 
                        />
                        <br />
                        <br />
                        <TextField label="Price" variant="outlined"
                        // onChange={e => {
                        //     this.setState({ password: e.target.value })
                        // }} 
                        />
                        <br />
                        <br />
                        <TextField label="Image Link" variant="outlined"
                        // onChange={e => {
                        //     this.setState({ password: e.target.value })
                        // }} 
                        />
                        <FormControl style={{ width: '50%' }}>
                            <InputLabel style={{ textAlign: 'right' }}>Category</InputLabel>
                            <Select
                            // onChange={(e) => updateQuantity(e.target.value)}
                            >
                                {/* {this.mapCategory()} */}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={this.props.handleClose} color="primary">
                            Add Inventory
                            </Button>
                    </DialogActions>
                </Dialog>


            </div>
        );
    }
}

export default AddItemDialog;