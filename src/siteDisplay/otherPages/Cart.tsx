import React, { Component } from 'react';
import APIURL from "../../helpers/environment";
import { CartDetails } from '../../Interfaces';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, List, Button, Container, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StyledList from '../../styledComponents/StyledList';
import {
    Route,
    Link,
    Switch, BrowserRouter as Router
} from 'react-router-dom';
import Checkout from './Checkout';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type CartData = {
    cartDetails: [CartDetails] | null,
    quantity: number,
    quantitytMap: Object
}

type propsData = {
    sessionToken: string | null
}

let subTotal: number = 0, numberOfItems: number = 0, itemTotal: number = 0;

class Cart extends Component<propsData, CartData> {
    constructor(props: propsData) {
        super(props)
        this.state = {
            cartDetails: null,
            quantity: 0,
            quantitytMap: {}
        }
    }

    componentDidMount() {
        this.fetchCart();
        // this.cartMapper();
        subTotal = 0;
        numberOfItems = 0;
        itemTotal = 0;
    }

    fetchCart = () => {
        if (this.props.sessionToken) {
            subTotal = 0;
            numberOfItems = 0;
            itemTotal = 0;
            console.log("Before Fetch")
            fetch(`${APIURL}/cart/`, {
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
                    console.log("Cart", data.cart);
                    this.setState({
                        cartDetails: data.cart
                    })
                })
                .catch((err) => alert(err));
        }
    }

    handleDelete = (id: number | undefined) => {

        if (this.props.sessionToken) {
            fetch(`${APIURL}/cart/${id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    this.fetchCart()
                })
                .catch((err) => alert(err));
        }
    }

    quantityAddition = (id: number, quantity: number, totalQuantity: number) => {
        console.log("Quantity Add", id, quantity, this.state.quantity, totalQuantity)
        quantity = quantity + 1;
        if (quantity > totalQuantity) {
            alert(`Only ${totalQuantity} items exist in the inventory`)
        } else {
            this.updateCart(id, quantity)
        }
    }

    updateCart = (id: number, quantity: number) => {
        if (this.props.sessionToken) {

            fetch(`${APIURL}/cart/${id}`, {
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
                        // this.fetchCart();
                        // this.cartMapper();
                        // this.render()
                        window.location.reload(false);
                    }
                })
                .catch((err) => console.log("error in editing cart", err));
        }
    }

    render() {
        return (
            <Container>
                <StyledList >
                    {this.state.cartDetails?.map((value, index) => {

                        if (value?.quantity && value?.item.price) {
                            itemTotal = value?.quantity * value?.item.price
                            subTotal = Math.round((subTotal + itemTotal) * 100 + Number.EPSILON) / 100;
                            numberOfItems = numberOfItems + value.quantity;
                        }
                        return (
                            <ListItem style={{ borderBottom: '1px solid #eeeeee' }} key={index} >
                                <ListItemAvatar>
                                    <Avatar
                                        alt={value?.item.itemName}
                                        src={value?.item.itemImage}
                                    />
                                </ListItemAvatar>
                                <ListItemText style={{ width: '50%' }}
                                    id={value?.item.itemName} primary={value?.item.itemName} />
                                <ListItemText primary={`$${value?.item.price} `} />
                                <ListItemText  >
                                    <Button className="plusButton" value={value.quantity}
                                        onClick={() => { this.quantityAddition(value.id, value.quantity, value.item.quantity) }}>
                                        <AddCircleOutlineIcon fontSize="small" />
                                    </Button>
                                    <TextField defaultValue={value?.quantity} variant="outlined" className="quantityText"
                                        onChange={(e) => { this.setState({ quantity: parseInt(e.target.value) }) }}
                                        name={value.item.quantity.toString()} />
                                    <Button className="minusButton" >
                                        <RemoveCircleOutlineIcon fontSize="small" />
                                    </Button>
                                </ListItemText>

                                <ListItemText primary={`$${itemTotal}`} />
                                <ListItemSecondaryAction >
                                    <Button value={value?.id} onClick={e => { this.handleDelete(value?.id) }}>
                                        <DeleteIcon />
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )

                    })
                    }
                </StyledList>

                <StyledList>
                    <ListItem style={{ borderBottom: '1px solid #eeeeee', textAlign: 'right' }}>
                        <ListItemText style={{ width: '80%', fontWeight: "bold" }}>
                            Total({numberOfItems} items): ${subTotal}
                        </ListItemText>
                        <ListItemText style={{ width: '30px' }}>
                        </ListItemText>
                    </ListItem>
                </StyledList>

                <StyledList>
                    <ListItem style={{ borderBottom: '1px solid #eeeeee', textAlign: 'right' }}>
                        <ListItemSecondaryAction style={{ width: '80%' }}>
                            <Link to="/checkout"> Proceed to Checkout </Link>
                        </ListItemSecondaryAction>
                        <ListItemText style={{ width: '30px' }}>
                        </ListItemText>
                    </ListItem>
                </StyledList>

            </Container>
        )
    }
}

export default Cart;