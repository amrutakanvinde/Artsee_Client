import React, { Component } from 'react'
import ItemDataGrid from '../../components/DataGrid'
import APIURL from "../../helpers/environment";
// import { MuiThemeProvider } from '@material-ui/styles/MuiThemeProvider';
import SellerTable from '../../components/SellerTable';
import { ItemDetails, Category } from '../../Interfaces';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import AddItemDialog from '../../components/AddItemDialog';
import EditItemDialog from '../../components/EditItemDialog';


type propsData = {
    sessionToken: string | null,
    addItemModal: boolean,
    editItemModal: boolean,
    snackbarOpen: boolean,
    handleAddItem: () => void,
    handleEditItem: () => void,
    handleClose: () => void,
    openSnackbar: (str: string) => void,
}

type SellerData = {
    itemData: [ItemDetails],
    categories: [Category],
    editData: ItemDetails | null
}

export class SellerHome extends Component<propsData, SellerData> {

    constructor(props: propsData) {
        super(props)
        this.state = {
            itemData: [{
                id: 0,
                itemName: '',
                price: 0,
                quantity: 0,
                sellerId: 0,
                itemImage: '',
                itemDescription: ''
            }],
            categories: [{
                id: 0,
                categoryName: ''
            }],
            editData: null
        }
    }

    componentDidMount() {
        console.log("Did Mount", this.props.sessionToken);
        this.fetchItems();
        this.getAllCategories();
    }

    fetchItems = () => {
        if (this.props.sessionToken) {
            console.log("Fetch")
            fetch(`${APIURL}/item/`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw new Error("Error");
                    } else return res.json();
                })
                .then((data) => {
                    console.log(data.item);
                    this.setState({
                        itemData: data.item
                    })
                })
                .catch((err) => alert(err));
        }
    }

    closeAddEditModal = () => {
        this.fetchItems();
        this.props.handleClose();
    }

    getAllCategories = () => {

        console.log("Fetch categories")
        if (this.props.sessionToken) {
            fetch(`${APIURL}/category/`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw new Error("Error");
                    } else return res.json();
                })
                .then((data) => {
                    // console.log(data.category);
                    this.setState({
                        categories: data.category
                    })
                })
                .catch((err) => alert(err));
        }

    }

    onEditLoad = (id: number) => {
        // console.log("Edit Load",)
        const clickedItem: ItemDetails | undefined = this.state.itemData.find(el => el.id === id)
        if (clickedItem) {
            this.setState({
                editData: clickedItem
            })
            this.props.handleEditItem();

        }
    }

    handleDelete = (id: number | undefined) => {

        if (this.props.sessionToken) {
            fetch(`${APIURL}/item/${id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
             .then((res) => {
                    this.props.openSnackbar("success")
                    // this.props.successAlert()
                    this.fetchItems()
            })
            .catch((err) => this.props.openSnackbar("error"));
        }
    }

    render() {
        // console.log("Seller page Render")
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Seller home page</h1>
                <Button
                    variant="contained"
                    color="primary"
                    // className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={this.props.handleAddItem}
                >
                    Add New Item
                </Button>
                <SellerTable itemData={this.state.itemData} onEditLoad={this.onEditLoad} handleDelete={this.handleDelete} />

                <AddItemDialog sessionToken={this.props.sessionToken} addItemModal={this.props.addItemModal} handleClose={this.closeAddEditModal} categories={this.state.categories} snackbarOpen={this.props.snackbarOpen} openSnackbar={this.props.openSnackbar} />

                {this.state.editData !== null ?

                    <EditItemDialog sessionToken={this.props.sessionToken} editItemModal={this.props.editItemModal} handleClose={this.closeAddEditModal} categories={this.state.categories} snackbarOpen={this.props.snackbarOpen} openSnackbar={this.props.openSnackbar} itemData={this.state.editData} />
                    : ""}
            </div>
        )
    }
}

export default SellerHome
