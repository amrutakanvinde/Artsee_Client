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
    addItemModal: boolean,
    snackbarOpen: boolean,
    categories: [Category],
    handleClose: () => void,
    openSnackbar: (str: string) => void
}

type AddItemData = {
    itemName: string,
    itemDescription: string,
    itemQuantity: number,
    itemPrice: number,
    itemImageLink: string,
    itemCategory: [number]
}

export class AddItemDialog extends Component<propsData, AddItemData> {

    constructor(props: propsData) {
        super(props)
        this.state = {
            itemName: '',
            itemDescription: '',
            itemQuantity: 0,
            itemPrice: 0,
            itemImageLink: '',
            itemCategory: [0]
        }
        // console.log("constructor")
    }

    // componentDidMount(){
    //     console.log("Add item componentDidMount")
    // }

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

    

    addItem = () => {
        if (this.props.sessionToken) {

            fetch(`${APIURL}/item/`, {
                method: "POST",
                body: JSON.stringify({
                    item: {
                        itemName: this.state.itemName,
                        quantity: this.state.itemQuantity,
                        price: this.state.itemPrice,
                        itemImage: this.state.itemImageLink,
                        itemDescription: this.state.itemDescription,
                        category_ids: [this.state.itemCategory]
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
                        console.log("Item added successfully")
                        this.props.openSnackbar("success");
                        this.props.handleClose();
                    }
                    //Add the number on cart item
                })
                .catch((err) => this.props.openSnackbar("error"));
        }
    }

    render() {
        // console.log("Add Item",this.props.itemData, this.props.isEdit)
        // console.log("render")

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
                            // value={this.state.itemName}
                            onChange={e => {
                                this.setState({ itemName: e.target.value })
                            }}
                        />
                        <br />
                        <br />

                        <TextField label="Description" variant="outlined" multiline
                            onChange={e => {
                                this.setState({ itemDescription: e.target.value })
                            }}
                        />
                        <br />
                        <br />
                        <TextField label="Quantity" variant="outlined"
                            onChange={e => {
                                this.setState({ itemQuantity: parseInt(e.target.value) })
                            }}
                        />
                        <br />
                        <br />
                        <TextField label="Price" variant="outlined"
                            onChange={e => {
                                this.setState({ itemPrice: parseFloat(e.target.value) })
                            }}
                        />
                        <br />
                        <br />
                        <TextField label="Image Link" variant="outlined"
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
                        <Button onClick={this.addItem} color="primary">
                            Add Inventory
                            </Button>
                    </DialogActions>
                </Dialog>


            </div>
        );
    }
}

export default AddItemDialog;