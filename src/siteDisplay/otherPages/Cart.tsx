import React, { Component } from 'react';
import APIURL from "../../helpers/environment";
import { CartDetails } from '../../Interfaces';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, List, Button, Container, TextField } from '@material-ui/core';
// import StyledList from '../../styledComponents/StyledList';
import {
    Route,
    Link,
    Switch, BrowserRouter as Router
} from 'react-router-dom';
import Checkout from './Checkout';
import CartListDisplay from '../tablesListsDatagrids/CartListDisplay';
import { withStyles } from '@material-ui/styles';

type CartData = {
    cartDetails: [CartDetails] | null,
    quantity: number,
    totalItems: number,
    totalPrice: number
}

type propsData = {
    sessionToken: string | null
}

const StyledList = withStyles({
    root: {
        width: '1000px',
        margin: 'auto',
        marginTop: '50px'
    }
})(List)

let subTotal: number = 0, numberOfItems: number = 0, itemTotal: number = 0;

class Cart extends Component<propsData, CartData> {
    constructor(props: propsData) {
        super(props)
        this.state = {
            cartDetails: null,
            quantity: 0,
            totalItems: 0,
            totalPrice: 0
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
            // console.log("Before Fetch")
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
                    data.cart.map((each: CartDetails) => {

                        if (each?.quantity && each?.item.price) {
                            itemTotal = Math.round((each?.quantity * each?.item.price) * 100 + Number.EPSILON) / 100;
                            subTotal = Math.round((subTotal + itemTotal) * 100 + Number.EPSILON) / 100;
                            numberOfItems = numberOfItems + each.quantity;
                            this.updateTotalItemsAndPrice(numberOfItems, subTotal)
                        }
                    });
                    this.setState({
                        cartDetails: data.cart
                    })

                })
                .catch((err) => alert(err));
        }
    }

    handleDelete = (id: number | undefined) => {
        console.log("In delete");
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

    updateTotalItemsAndPrice = (totalItems: number, totalPrice: number) => {
        // console.log("Updated")
        this.setState({
            totalItems: totalItems,
            totalPrice: totalPrice
        })
    }


    render() {
        return (
            <Container>

                <StyledList>
                    <ListItem style={{ borderBottom: '1px solid #eeeeee' }} >
                        <ListItemText style={{ minWidth: "50px" }} >
                           
                        </ListItemText>
                        <ListItemText style={{ minWidth: "300px"}} primary="Item Name" className="boldFont" />
                        <ListItemText primary="Item Price" style={{ minWidth: "200px" }} />
                        <ListItemText style={{ minWidth: '200px' }} primary="Item Quantity">
                        </ListItemText>

                        <ListItemText primary="SubTotal" style={{ minWidth: '150px' }} />
                        <ListItemText primary="Delete" style={{ width: '400px' }} />
                    </ListItem>
                </StyledList>
                <StyledList>
                    {this.state.cartDetails?.map((value, index) => {
                        return (
                            <CartListDisplay key={index} itemId={value.item.id} itemName={value?.item.itemName}
                                itemImage={value?.item.itemImage} quantity={value.quantity} itemQuantity={value.item.quantity} itemTotal={Math.round((value?.quantity * value?.item.price) * 100 + Number.EPSILON) / 100}
                                price={value?.item.price} cartId={value.id}
                                sessionToken={this.props.sessionToken}
                                handleDelete={this.handleDelete} updateTotalItemsAndPrice={this.updateTotalItemsAndPrice} totalItems={this.state.totalItems} totalPrice={this.state.totalPrice}
                            />
                        )
                    })
                    }
                </StyledList>

                <StyledList>
                    <ListItem style={{ borderBottom: '1px solid #eeeeee', textAlign: 'right' }}>
                        <ListItemText style={{ width: '80%', fontWeight: "bold" }}>
                            Total({this.state.totalItems} items): ${this.state.totalPrice}
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