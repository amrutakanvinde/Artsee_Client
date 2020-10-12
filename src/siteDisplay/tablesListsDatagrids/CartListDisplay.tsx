import React, { Component } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, List, Button, Container, TextField } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

type propsData = {
    index: number,
    cartId: number,
    itemId: number,
    itemName: string,
    itemImage: string,
    quantity: number,
    itemQuantity: number,
    itemTotal: number,
    price: number,
    quantityAddition: (id: number, quantity: number, totalQuantity: number) => void,
    quantitySubtraction: (id: number, quantity: number, totalQuantity: number) => void,
    handleDelete: (id: number | undefined) => void
}

type CartItemsDisplay = {

}

export default class CartListDisplay extends Component<propsData, CartItemsDisplay> {
    constructor(props: propsData) {
        super(props)
    }

    render() {
        return (
            <ListItem style={{ borderBottom: '1px solid #eeeeee' }} key={this.props.index} >
                <ListItemAvatar>
                    <Avatar
                        alt={this.props.itemName}
                        src={this.props.itemImage}
                    />
                </ListItemAvatar>
                <ListItemText style={{ width: '50%' }}
                    id={this.props.itemName} primary={this.props.itemName} />
                <ListItemText primary={`$${this.props.price} `} />
                <ListItemText  >
                    <Button className="plusButton" value={this.props.quantity}
                        onClick={() => { this.props.quantityAddition(this.props.cartId, this.props.quantity, this.props.itemQuantity) }}>
                        <AddCircleOutlineIcon fontSize="small" />
                    </Button>
                    <TextField defaultValue={this.props?.quantity} variant="outlined" className="quantityText"
                        onChange={(e) => { this.setState({ quantity: parseInt(e.target.value) }) }}
                        name={this.props.quantity.toString()} />
                    <Button className="minusButton"
                        onClick={() => { this.props.quantitySubtraction(this.props.cartId, this.props.quantity, this.props.itemQuantity) }}>
                        <RemoveCircleOutlineIcon fontSize="small" />
                    </Button>
                </ListItemText>

                <ListItemText primary={`$${this.props.itemTotal}`} />
                <ListItemSecondaryAction >
                    <Button value={this.props.itemId} onClick={e => { this.props.handleDelete(this.props.itemId) }}>
                        <DeleteIcon />
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}