import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BuyerHome } from './BuyerHome';
import SellerHome from './SellerHome';
import AdminHome from './AdminHome';

type HomeData = {
    modalOpen: boolean
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
        let currentRole = localStorage.getItem("role");
        return (
            <div className="divHome">
                {currentRole === this.props.hashMyString("buyer") ? 
                <BuyerHome sessionToken={this.props.sessionToken} handleOpen= {this.handleOpen} handleClose={this.handleClose} modalOpen={this.state.modalOpen}/>
                :currentRole === this.props.hashMyString("seller") ?
                <SellerHome sessionToken={this.props.sessionToken}/> 
                :currentRole === this.props.hashMyString("admin") ?
                <AdminHome /> : ""
                }
            </div>
        )
    }
}