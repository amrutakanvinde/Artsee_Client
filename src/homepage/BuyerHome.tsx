import React, { Component } from 'react';
import APIURL from "../helpers/environment";
import Item from '../Components/Item'
import { ItemDetails } from '../Interfaces'
import { Grid, withStyles } from '@material-ui/core';

type BuyerData = {
    itemData: []
}

type propsData = {
    sessionToken: string | null
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
            itemData: []
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
                        itemData: data.item
                    })
                })
                .catch((err) => alert(err));
        }
    }

    addItem = (id: number, quantity: number) => {
        // console.log("Button", id, quantity)

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
                        console.log("Item added successfully")
                    }
                    //Add the number on cart item
                })
                .catch((err) => console.log(err));
        }
    }

    componentDidMount() {
        this.fetchItems();
    }

    render() {
        return (

            <Grid container spacing={0} >
                {
                    this.state.itemData.map((item: ItemDetails, index: number) => {
                        return (

                            <Grid item xs={3} spacing={0} >
                                <Item id={item.id} itemName={item.itemName} quantity={item.quantity} price={item.price} sellerId={item.sellerId} itemImage={item.itemImage} itemDescription={item.itemDescription} addItem={this.addItem} />
                            </Grid>
                        )
                    })
                }
            </Grid>

        );
    }
}
