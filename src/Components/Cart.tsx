import React, { Component } from 'react';
import APIURL from "../helpers/environment";
import { UserDetails, ItemDetails, CartDetails } from '../Interfaces';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, List, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

type CartData = {
    // cartDetails: CartDetails,
    // itemDetails: ItemDetails,
    // userDetails: UserDetails,
    cartDetails: [CartDetails | null]
}

type propsData = {
    sessionToken: string | null
}

class Cart extends Component<propsData, CartData> {
    constructor(props: propsData) {
        super(props)
        this.state = {
            cartDetails: [null]
        }
    }

    componentDidMount() {
        this.fetchCart();
    }

    fetchCart = () => {
        if (this.props.sessionToken) {
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
                    // let objCart:CartDetails = {
                    //     quantity: 0,
                    //     id: 0
                    // };
                    let objUser: UserDetails = {
                        email: "",
                        firstName: "",
                        lastName: "",
                        id: 0,
                        password: "",
                        role: "",
                        userName: ""
                    }

                    let objItem: ItemDetails = {
                        id: 0,
                        itemName: "",
                        price: 0,
                        quantity: 0,
                        sellerId: 0,
                        itemImage: "",
                        itemDescription: ""
                    }
                    // let arr: any = [{}];

                    console.log("Cart", data.cart);
                    this.setState({
                        cartDetails: data.cart
                    })
                    //     this.state.cartDetails.push(data.cart[i]);
                    // }
                    // Object.entries(this.state.cartDetails).forEach(([key,value]) => { data.cart[key] = value })
                    // for (let i = 0; i < data.cart.length; i++){
                    //     console.log("Before", objCart)
                    // Object.assign(obj, data.cart[i]);
                    // objCart = {...objCart, ...data.cart[i]}
                    // objItem = {...objItem, ...data.cart[i].item}
                    // console.log("Item", data.cart[i].item)
                    // Object.entries(obj).forEach(([key,value]) => { 
                    //     data.cart[i][key] = value 
                    //     console.log("Inside", data.cart[i][key], value)
                    // })
                    // arr.push({obj: obj})
                    // console.log("After", objCart, objItem)
                    // }

                    // Object.assign(this.state.cartDetails,obj);
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

    render() {
        return (
            <List style={{ width: '1000px', margin: 'auto', marginTop:'50px' }}>
                {this.state.cartDetails?.map((value, index) => {
                    let total = 0;
                    if (value?.quantity && value?.item.price) {
                        total = value?.quantity * value?.item.price
                    }
                    return (
                        <ListItem style={{ borderBottom: '1px solid #eeeeee' }} key={index} button>
                            <ListItemAvatar>
                                <Avatar
                                    alt={value?.item.itemName}
                                    src={value?.item.itemImage}
                                />
                            </ListItemAvatar>
                            <ListItemText style={{ width: '50%' }}
                                id={value?.item.itemName} primary={value?.item.itemName} />
                            <ListItemText primary={`$${value?.item.price} `} />
                            <ListItemText primary={`${value?.quantity} `} />

                            <ListItemText primary={`$${total}`} />
                            <ListItemSecondaryAction >
                                <Button value={value?.id} onClick={e => { this.handleDelete(value?.id) }}>
                                    <DeleteIcon />
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>

                    )
                })}
            </List>
        )
    }
}

export default Cart;