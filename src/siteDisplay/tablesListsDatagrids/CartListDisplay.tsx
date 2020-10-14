import React, { Component } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, List, Button, Container, TextField } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import APIURL from "../../helpers/environment";

type propsData = {
    key: number,
    cartId: number,
    itemId: number,
    itemName: string,
    itemImage: string,
    quantity: number,
    itemQuantity: number,
    itemTotal: number,
    price: number,
    totalItems: number,
    totalPrice: number,
    sessionToken: string | null
    handleDelete: (id: number | undefined) => void
    updateTotalItemsAndPrice: (totalItems: number, totalPrice: number) => void
}

type CartItemsDisplay = {
    currentQuantity: number, 
    currentSubTotal: number,
    oldQuantity: number,
    oldTotalPrice: number
}

export default class CartListDisplay extends Component<propsData, CartItemsDisplay> {
    constructor(props: propsData) {
        super(props)
        this.state = {
            currentQuantity: this.props.quantity,
            currentSubTotal: this.props.itemTotal,
            oldQuantity: this.props.quantity,
            oldTotalPrice: this.props.totalPrice
        }
        // this.props.updateTotalItemsAndPrice()
    }


    quantityAddition = (cartId: number, quantity: number, totalQuantity: number) => {
        console.log("Quantity Add", cartId, quantity, totalQuantity)
        quantity = quantity + 1;
        if (quantity > totalQuantity) {
            alert(`Only ${totalQuantity} items exist in the inventory`)
        } else {
            this.updateCart(cartId, quantity)
        }
    }

    quantitySubtraction = (cartId: number, quantity: number, totalQuantity: number) => {
        console.log("Quantity Subraction", cartId, quantity, totalQuantity)
        quantity = quantity - 1;
        if (quantity < 1) { 
            alert(`You cannot go below 1 items. Delete if required using delete button`)
        } else {
            this.updateCart(cartId, quantity)
        }
    }

    quantityTextBox = (cartId: number, newQuantity: string, totalQuantity: number) => {

        let quantity: number;

        if(newQuantity == null || newQuantity == ""){
            this.setState({
                currentQuantity: 0,
                currentSubTotal: 0
            })
            return;
            // quantity = 1
            
        } else {
            quantity = parseInt(newQuantity);
        }

        if(quantity < 1 || quantity > totalQuantity){
            alert(`Quantity can only be between 1 and ${totalQuantity}!`)
        } else {
            this.updateCart(cartId,quantity)
        }
    }

    updateCart = (cartId: number, quantity: number) => {
        if (this.props.sessionToken) {

            fetch(`${APIURL}/cart/${cartId}`, {
                method: "PUT",
                body: JSON.stringify({
                    cart: {
                        quantity: quantity
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
                        console.log("Cart edited successfully")
                        this.setState({
                            currentQuantity: quantity,
                            currentSubTotal: Math.round((quantity * this.props.price) * 100 + Number.EPSILON) / 100
                        }, () => console.log("state changed", this.state) )

                        // console.log("Total Items", this.props.totalItems);
                        // console.log("Old Quantity", this.props.quantity);
                        // console.log("Current Quantity", quantity);
                        // console.log("What it should be Quantity", this.props.totalItems - this.state.oldQuantity + quantity)
                        this.props.updateTotalItemsAndPrice(
                            (this.props.totalItems - this.state.oldQuantity + quantity),
                            (Math.round((this.props.totalPrice - (this.state.oldQuantity * this.props.price) + (quantity * this.props.price)) * 100 + Number.EPSILON) / 100)
                        )

                        this.setState({
                            oldQuantity: quantity
                        })
                        
                    }
                })
                .catch((err) => console.log("error in editing cart", err));
        }
    }

    render() {
        // console.log("In render", this.state)
        return (
            <ListItem style={{ borderBottom: '1px solid #eeeeee' }} key={this.props.key} >
                <ListItemAvatar>
                    <Avatar
                        alt={this.props.itemName}
                        src={this.props.itemImage}
                    />
                </ListItemAvatar>
                <ListItemText style={{ minWidth: "300px" }}
                    id={this.props.itemName} primary={this.props.itemName} />
                <ListItemText primary={`$${this.props.price} `} style={{ minWidth: "200px" }}/>
                <ListItemText style={{ width: '500px' }} >
                    <Button className="plusButton" value={this.props.quantity}
                        onClick={() => { this.quantityAddition(this.props.cartId, this.state.currentQuantity, this.props.itemQuantity) }}>
                        <AddCircleOutlineIcon fontSize="small" />
                    </Button>
                    <TextField value={this.state.currentQuantity} variant="outlined" className="quantityText"
                        onChange={(e) => { this.quantityTextBox(this.props.cartId, (e.target.value), this.props.itemQuantity)}} 
                        />
                    <Button className="minusButton"
                        onClick={() => { this.quantitySubtraction(this.props.cartId, this.state.currentQuantity, this.props.itemQuantity) }}>
                        <RemoveCircleOutlineIcon fontSize="small" />
                    </Button>
                </ListItemText>

                <ListItemText primary={`$${this.state.currentSubTotal}`} style={{ width: '400px' }}/>
                <ListItemSecondaryAction>
                    <Button value={this.props.cartId} onClick={e => { 
                        // console.log("Current Quantity", this.state.currentQuantity, this.state.oldQuantity)
                        // this.setState({
                        //     currentQuantity: 0,
                        //     currentSubTotal: 0,
                        //     oldQuantity: 0,
                        //     oldTotalPrice: 0
                        // })
                    this.props.handleDelete(this.props.cartId) 
                    }}>
                        <DeleteIcon />
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}