import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BuyerHome } from './BuyerHome';
import SellerHome from './SellerHome';
import AdminHome from './AdminHome';
import { ItemDetails } from '../../Interfaces';

type HomeData = {
    modalOpen: boolean,
    snackbarOpen: boolean,
    item: ItemDetails,
    addItemModal: boolean
}

type propsData = {
    clearToken: () => void,
    sessionToken: string | null,
    role: string | null,
    hashMyString: (str: string) => string,
}

export class Homepage extends Component<propsData, HomeData> {
    constructor(props: propsData) {
        super(props)
        this.state = {
            modalOpen: false,
            snackbarOpen: false,
            addItemModal: false,
            item: {
                id: 0,
                itemName: '',
                price: 0,
                quantity: 0,
                sellerId: 0,
                itemImage: '',
                itemDescription: '',
            }
        }
    }

     handleOpen = (item: ItemDetails) => {
        //  console.log("Modal Open")
        let itemDisplay: ItemDetails = {
                id: item.id,
                itemName: item.itemName,
                price: item.price,
                quantity: item.quantity,
                sellerId: item.sellerId,
                itemImage: item.itemImage,
                itemDescription: item.itemDescription
        }
        this.setState({
            modalOpen: true,
        })
        return itemDisplay;
      };
    
      openSnackbar = () => {
        this.setState({
            snackbarOpen: true,
        })
      }

      handleAddItem = () => {
          this.setState({
              addItemModal: true
          })
      }

       handleClose = () => {
        this.setState({
            modalOpen: false,
            snackbarOpen: false,
            addItemModal: false
        })
      };

    render() {
        let currentRole = localStorage.getItem("role");
        return (
            <div className="divHome">
                {currentRole === this.props.hashMyString("buyer") ? 
                <BuyerHome sessionToken={this.props.sessionToken} handleOpen= {this.handleOpen} handleClose={this.handleClose} modalOpen={this.state.modalOpen} openSnackbar= {this.openSnackbar} snackbarOpen={this.state.snackbarOpen}/>
                :currentRole === this.props.hashMyString("seller") ?
                <SellerHome sessionToken={this.props.sessionToken} addItemModal={this.state.addItemModal} handleAddItem={this.handleAddItem} handleClose={this.handleClose}/> 
                :currentRole === this.props.hashMyString("admin") ?
                <AdminHome /> : ""
                }
            </div>
        )
    }
}