import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BuyerHome } from './BuyerHome';
import SellerHome from './SellerHome';
import AdminHome from './AdminHome';
import { ItemDetails } from '../../Interfaces';
import { CustomizedSnackbars } from '../dialogModalsPopups/CustomizedSnackbar';

type HomeData = {
    modalOpen: boolean,
    snackbarOpen: boolean,
    severity: string ,
    item: ItemDetails,
    addItemModal: boolean,
    editItemModal: boolean,
    editUserModal: boolean,
    confirmationDeleteModal: boolean,
    confirmationRoleModal: boolean,
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
            severity: "",
            addItemModal: false,
            editItemModal: false,
            editUserModal: false,
            confirmationDeleteModal: false,
            confirmationRoleModal: false,
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
    
      openSnackbar = (severity: string) => {
        //   console.log("Open")

        this.setState({
            snackbarOpen: true,
            severity: severity
        })
      }

      handleAddItem = () => {
          this.setState({
              addItemModal: true
          })
      }

      handleEditItem = () => {
        this.setState({
            editItemModal: true
        })
      }

      handleEditUser = () => {
        this.setState({
            editUserModal: true
        })
      }

      handleConfirmationDelete = () => {
          this.setState({
              confirmationDeleteModal: true
          })
      }

      handleConfirmationRole = () => {
        this.setState({
            confirmationRoleModal: true
        })
    }

       handleClose = () => {
        this.setState({
            modalOpen: false,
            snackbarOpen: false,
            addItemModal: false,
            editItemModal: false,
            editUserModal: false,
            confirmationDeleteModal: false,
            confirmationRoleModal: false
        })

      };

    render() {
        let currentRole = localStorage.getItem("role");
        return (
            <div className="divHome">
                {currentRole === this.props.hashMyString("buyer") ? 
                <BuyerHome sessionToken={this.props.sessionToken} handleOpen= {this.handleOpen} handleClose={this.handleClose} modalOpen={this.state.modalOpen} openSnackbar= {this.openSnackbar} snackbarOpen={this.state.snackbarOpen}/>
                :currentRole === this.props.hashMyString("seller") ?
                <SellerHome sessionToken={this.props.sessionToken} addItemModal={this.state.addItemModal} handleAddItem={this.handleAddItem} handleClose={this.handleClose} openSnackbar= {this.openSnackbar} snackbarOpen={this.state.snackbarOpen} editItemModal={this.state.editItemModal} handleEditItem={this.handleEditItem}/> 
                :currentRole === this.props.hashMyString("admin") ?
                <AdminHome sessionToken={this.props.sessionToken} handleEditUser={this.handleEditUser}  editUserModal={this.state.editUserModal} handleClose={this.handleClose} openSnackbar= {this.openSnackbar} snackbarOpen={this.state.snackbarOpen}
                handleConfirmationDelete={this.handleConfirmationDelete} confirmationDeleteModal={this.state.confirmationDeleteModal} handleConfirmationRole={this.handleConfirmationRole} confirmationRoleModal={this.state.confirmationRoleModal} 
                /> : ""
                }
                 <CustomizedSnackbars handleClose={this.handleClose} snackbarOpen={this.state.snackbarOpen} severity={this.state.severity}/>
            </div>
        )
    }
}