import React, { Component } from 'react';
import APIURL from "../helpers/environment";
import Item from '../Components/Item'
import { ItemData } from '../Interfaces'
import { Grid } from '@material-ui/core';

type BuyerData = {
    itemData: []
}

type propsData = {
    sessionToken: string | null
}

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

    componentDidMount() {
        this.fetchItems();
    }

    render() {
        return (
            
            <Grid container spacing={5} >
                {
                    this.state.itemData.map((item: ItemData, index: number) => {
                        return (

                            <Grid item xs={6} sm={3}>
                                <Item key={item.id} itemName={item.itemName} quantity={item.quantity} price={item.price} sellerId={item.sellerId} />
                            </Grid>
                        )
                    })
                }
            </Grid>

        );
    }
}
