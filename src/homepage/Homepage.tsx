import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BuyerHome } from './BuyerHome';
import Cart from '../Components/Cart'


type HomeData = {

}

type propsData = {
    clearToken: () => void,
    sessionToken: string | null,
    role: string | null
}

export class Homepage extends Component<propsData, HomeData> {
    constructor(props: propsData) {
        super(props)
    }

    render() {
        return (
            <div className="divHome">
                {/* {this.props.sessionToken ?   */}
                
                {/* : ""} */}
               
                {/* {this.props.role === "buyer" ?  */}
                <BuyerHome sessionToken={this.props.sessionToken} />
                {/* : ""
                this.props.role === "seller" ?
                <SellerHome /> :
                this.props.role === "admin" ?
                <AdminHome />
            } */}
            </div>
        )
    }
}