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
    editItemModal: boolean,
    snackbarOpen: boolean,
    categories: [Category],
    itemData: ItemDetails,
    handleClose: () => void,
    openSnackbar: (str: string) => void
}

type EditItemData = {
    itemName: string,
    itemDescription: string,
    itemQuantity: number,
    itemPrice: number,
    itemImageLink: string,
    itemCategory: [number]
}

export class EditUserDialog extends Component<propsData, EditItemData> {

    constructor(props: propsData) {
        super(props)
        console.log("Props display",this.props)
        this.state = {
            itemName: this.props.itemData.itemName,
            itemDescription: this.props.itemData.itemDescription,
            itemQuantity: this.props.itemData.quantity,
            itemPrice: this.props.itemData.price,
            itemImageLink: this.props.itemData.itemImage,
            itemCategory: [0]
        }
        console.log("constructor")
    }

    handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.handleClose();
    };

    updateCategory = (newCategory: any) => {
        this.setState({
            itemCategory: newCategory
        })
    }

    mapCategory = () => {
        let arr: any = [];
        this.props.categories.map(cat => {
            arr.push(<MenuItem value={cat.id}>{cat.categoryName}</MenuItem>)
        });
        return arr;
    }

    // function to add multiple select 
    handleChange = (event: React.ChangeEvent<{ value: number }>) => {
        this.setState({
            itemCategory: [event.target.value]
        })
    };

    editItem = () => {

        console.log("On Edit", this.state.itemName, this.props.itemData.id)
        if (this.props.sessionToken) {

            fetch(`${APIURL}/item/${this.props.itemData.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    item: {
                        itemName: this.state.itemName,
                        quantity: this.state.itemQuantity,
                        price: this.state.itemPrice,
                        itemImage: this.state.itemImageLink,
                        itemDescription: this.state.itemDescription,
                        // category_ids: [this.state.itemCategory]
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
                        console.log("Item edited successfully")
                        this.props.handleClose();
                        this.props.openSnackbar("success");
                    }
                    //Add the number on cart item
                })
                .catch((err) => this.props.openSnackbar("error"));
        }
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.editItemModal} onClose={() => this.handleClose} aria-labelledby="form-dialog-title"
                    BackdropProps={{ invisible: false, classes: { root: 'customBackdrop' } }}>
                    <DialogTitle id="form-dialog-title">
                        Add New Item
                        </DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                        </DialogContentText>
                        <TextField label="Name" variant="outlined"
                            defaultValue={this.props.itemData.itemName}
                            onChange={e => {
                                this.setState({ itemName: e.target.value })
                            }}
                        ></TextField>
                        <br />
                        <br />

                        <TextField label="Description" variant="outlined"
                            defaultValue={this.props.itemData.itemDescription}
                            multiline
                            onChange={e => {
                                this.setState({ itemDescription: e.target.value })
                            }}
                        />
                        <br />
                        <br />
                        <TextField label="Quantity" variant="outlined"
                            defaultValue={this.props.itemData.quantity}
                            onChange={e => {
                                this.setState({ itemQuantity: parseInt(e.target.value) })
                            }}
                        />
                        <br />
                        <br />
                        <TextField label="Price" variant="outlined"
                            defaultValue={this.props.itemData.price}
                            onChange={e => {
                                this.setState({ itemPrice: parseFloat(e.target.value) })
                            }}
                        />
                        <br />
                        <br />
                        <TextField label="Image Link" variant="outlined"
                            defaultValue={this.props.itemData.itemImage}
                            onChange={e => {
                                this.setState({ itemImageLink: e.target.value })
                            }}
                        />
                        <FormControl style={{ width: '50%' }}>
                            <InputLabel style={{ textAlign: 'right' }}>Category</InputLabel>
                            <Select onChange={(e) => this.updateCategory(e.target.value)}>
                                {this.mapCategory()}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={this.editItem} color="primary">
                            Edit Inventory
                            </Button>
                    </DialogActions>
                </Dialog>


            </div>
        );
    }
}

export default EditUserDialog;
