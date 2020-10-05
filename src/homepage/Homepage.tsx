import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BuyerHome } from './BuyerHome';

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
                 <nav id="navbar">
                 <ul>
                     <li id="name"><a href="#" className="nav-link">Artsee!</a></li>
                     <li><a onClick={this.props.clearToken} className="nav-link">Logout</a></li>
                     <li><a href="#" className="nav-link">My Account</a></li>
                     <li><a href="#" className="nav-link">Cart</a></li>
                     <li><a href="#" className="nav-link">Home</a></li>
                 </ul>
                </nav>
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