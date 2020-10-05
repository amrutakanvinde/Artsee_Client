import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BuyerHome } from './BuyerHome';
import Cart from '../Components/Cart'
import {
    Route,
    Link,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom';

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
                <Router>
                 <nav id="navbar">
                 <ul>
                     <li id="name"><a href="#" className="nav-link">Artsee!</a></li>
                     <li><a onClick={this.props.clearToken} className="nav-link">Logout</a></li>
                     <li><a href="#" className="nav-link">My Account</a></li>
                     <li><Link to = "/cart" className="nav-link"> Cart </Link>
                         {/* <a href="#" className="nav-link">Cart</a> */}
                         </li>
                     <li><Link to = "/" className="nav-link"> Home </Link>
                         {/* <a href="#" className="nav-link">Home</a> */}
                         </li>
                 </ul>
                </nav>
                <div className="navbarRoute">
                    <Switch>
                        <Route exact path="/"><BuyerHome sessionToken={this.props.sessionToken} /></Route>
                        <Route exact path="/cart"><Cart/></Route>
                    </Switch>
                </div>
                </Router>
                {/* : ""} */}
               
                {/* {this.props.role === "buyer" ?  */}
                {/* <BuyerHome sessionToken={this.props.sessionToken} /> */}
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