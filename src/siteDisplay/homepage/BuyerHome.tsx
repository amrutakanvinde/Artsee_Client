import React, { Component } from 'react';
import APIURL from "../../helpers/environment";
import CardItemsDisplay from '../tablesListsDatagrids/CardItemsDisplay'
import { ItemDetails } from '../../Interfaces'
import { Grid, withStyles, FormControl, InputLabel, Select, MenuItem, Container, TextField } from '@material-ui/core';

type BuyerData = {
    originalItemData: [],
    itemData: ItemDetails[] | null
}

type propsData = {
    sessionToken: string | null,
    modalOpen: boolean,
    snackbarOpen: boolean,
    handleOpen: (item: ItemDetails) => ItemDetails,
    handleClose: () => void,
    openSnackbar: (str: string) => void,
}

const StyledGrid = withStyles({
    root: {
        'padding-left': '0px',
        'padding-right': '0px'
    }
})(Grid);

export class BuyerHome extends Component<propsData, BuyerData> {
    constructor(props: propsData) {
        super(props)
        this.state = {
            originalItemData: [],
            itemData: null
        }
    }

    fetchItems = () => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/item/all/`, {
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
                    // console.log(data.item);
                    this.setState({
                        itemData: data.item,
                        originalItemData: data.item
                    })
                })
                .catch((err) => alert(err));
        }
    }

    compareValues(key: string, order = 'asc') {
        return function innerSort(a: any, b: any) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    addItem = (id: number, quantity: number) => {
        // console.log("Add Button", id, quantity)

        if (this.props.sessionToken) {

            fetch(`${APIURL}/cart/`, {
                method: "POST",
                body: JSON.stringify({
                    cart: {
                        quantity: quantity,
                        itemId: id
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
                        // console.log("Item added successfully")
                        this.props.handleClose();
                        this.props.openSnackbar("success");
                    }
                    //Add the number on cart item
                })
                .catch((err) => this.props.openSnackbar(err));
        }
    }

    componentDidMount() {
        // console.log("MOUNTED")
        this.fetchItems();
    }

    onSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        if (e.target.value) {
            let value: any = e.target.value
            if (value === "priceDesc") {
                value = "price";
                if (this.state.itemData != undefined) {
                    this.setState({
                        itemData: this.state.itemData?.sort(this.compareValues(value, 'desc'))
                    })
                }
            } else {
                if (this.state.itemData != undefined) {
                    this.setState({
                        itemData: this.state.itemData?.sort(this.compareValues(value))
                    })
                }
            }
        }
    }

    onFilter = (e: string) => {

        if (e !== "") {
            const filteredElements: ItemDetails[] | undefined = this.state.itemData?.filter(f => {
                return f.itemName.toLowerCase().includes(e.toLowerCase())
            })

            if (filteredElements) {
                this.setState({
                    itemData: filteredElements
                })
            }
        } else {
            this.setState({
                itemData: this.state.originalItemData
            })
        }
    }

    render() {
        return (

            <Grid container spacing={0} >
                <Container>
                    <TextField label="Search" style={{ width: '50%' }}
                        onChange={(e) => this.onFilter(e.target.value)}
                    />

                    <FormControl style={{ width: '50%' }}>
                        <InputLabel style={{ textAlign: 'right' }}>Sort</InputLabel>
                        <Select
                            onChange={(e) => { this.onSortChange(e) }}
                        >
                            <MenuItem value={"itemName"}>Alphabetical</MenuItem>
                            <MenuItem value={"price"}>Price Ascending</MenuItem>
                            <MenuItem value={"priceDesc"}>Price Descending</MenuItem>
                            <MenuItem value={"quantity"}>Quantity</MenuItem>
                        </Select>
                    </FormControl>


                </Container>
                {
                    this.state.itemData?.map((item: ItemDetails, index: number) => {
                        return (

                            <Grid item xs={3} spacing={0} >
                                <CardItemsDisplay id={item.id} itemName={item.itemName} quantity={item.quantity} price={item.price} sellerId={item.sellerId} itemImage={item.itemImage} itemDescription={item.itemDescription} addItem={this.addItem} handleOpen={this.props.handleOpen} handleClose={this.props.handleClose} modalOpen={this.props.modalOpen} snackbarOpen={this.props.snackbarOpen} />
                            </Grid>
                        )
                    })
                }
            </Grid>

        );
    }
}
