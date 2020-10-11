import React, { Component } from 'react'
import ItemDataGrid from '../../components/DataGrid'
import APIURL from "../../helpers/environment";
// import { MuiThemeProvider } from '@material-ui/styles/MuiThemeProvider';
import BasicTable from '../../components/BasicTable';
import { ItemDetails, Categories } from '../../Interfaces';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import AddItemDialog from '../../components/AddItemDialog';


type propsData = {
    sessionToken: string | null,
    addItemModal: boolean,
    handleAddItem: () => void,
    handleClose: () => void,
}

type SellerData = {
    itemData: [ItemDetails],
    categories: Categories
    // data: []
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
            categories: {
                id: 0,
                categoryName: ''
            }
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
                    console.log(data.category);
                    this.setState({
                        categories: data.category
                    })
                })
                .catch((err) => alert(err));
        }

    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Seller home page</h1>
                <Button 
                    variant="contained"
                    color="primary"
                    // className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={this.props.handleAddItem}
                >
                    Add New Item
                </Button>
                <BasicTable itemData={this.state.itemData} />
                <AddItemDialog sessionToken={this.props.sessionToken} addItemModal={this.props.addItemModal}  handleClose={this.props.handleClose} categories={this.state.categories}/>
            </div>
        )
    }
}

export default SellerHome
