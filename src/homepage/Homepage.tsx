import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BuyerHome } from './BuyerHome';
import Cart from '../Components/Cart'
import SellerHome from './SellerHome';
import AdminHome from './AdminHome';


type HomeData = {
    modalOpen: boolean
}

type propsData = {
    clearToken: () => void,
    sessionToken: string | null,
    role: string | null
}



export class Homepage extends Component<propsData, HomeData> {
    constructor(props: propsData) {
        super(props)
        this.state = {
            modalOpen: false
        }
    }

     handleOpen = () => {
        //  console.log("Modal Open")
        this.setState({
            modalOpen: true
        })
      };
    
       handleClose = () => {
        this.setState({
            modalOpen: false
        })
      };

    render() {
        return (
            <div className="divHome">
                {this.props.role === "buyer" ? 
                <BuyerHome sessionToken={this.props.sessionToken} handleOpen= {this.handleOpen} handleClose={this.handleClose} modalOpen={this.state.modalOpen}/>
                :this.props.role === "seller" ?
                <SellerHome /> 
                :this.props.role === "admin" ?
                <AdminHome /> : ""
                }
            </div>
        )
    }
}