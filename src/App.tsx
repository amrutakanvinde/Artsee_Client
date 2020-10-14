import React from 'react';
import './App.css';
import { Auth } from './siteDisplay/auth/Auth';
import { Paper, Tabs, Tab, Box, Typography, AppBar, Container, Snackbar, Button } from '@material-ui/core';
import { Homepage } from './siteDisplay/homepage/Homepage';
import { UserData } from './Interfaces';
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import Cart from './siteDisplay/otherPages/Cart';
import Checkout from './siteDisplay/otherPages/Checkout';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import MyAccount from './siteDisplay/otherPages/MyAccount';
import { ElementsConsumer, Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './siteDisplay/otherPages/Checkout';
import { loadStripe } from '@stripe/stripe-js';

type AppData = {
  sessionToken: string | null,
  userRole: string | null,
  modalOpen: boolean,
  classChange: string
}


const stripePromise = loadStripe('pk_test_51HbYrAGvh0r8rJRFSq4cNNU2ZbT4HreYVx0eJtwGkFg6mVUFRGMGm6Wl3pqKmJxlwPzMgkwyCcpJsEeGvHAOiDXy00tuDseZ4n');

class App extends React.Component<{}, AppData> {
  constructor(props: {}) {
    super(props)

    this.state = {
      sessionToken: localStorage.getItem('token') ? localStorage.getItem('token') : "",
      userRole: localStorage.getItem('role') ? localStorage.getItem('role') : "",
      modalOpen: false,
      classChange: "buyerDiv"
    }
  }

  hashMyString = (valueToHash: string) => {

    const crypto = require('crypto');
    // change to 'md5' if you want an MD5 hash
    let hash = crypto.createHash('sha1');
    // change to 'binary' if you want a binary hash.
    hash.setEncoding('hex');
    // the text that you want to hash
    hash.write(valueToHash);
    // very important! You cannot read from the stream until you have called end()
    hash.end();
    // and now you get the resulting hash
    let sha1sum = hash.read();

    return sha1sum;
  }


  InjectedCheckoutForm = () => (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );

  setUserRole = (role: string) => {

    localStorage.setItem('role', this.hashMyString(role));
    this.setState({
      userRole: role
    })
  }

  updateUser = (user: UserData) => {
    localStorage.setItem('token', user.sessionToken);
    this.setUserRole(user.user.role);
    // console.log("role in update", user.user.role)
    this.setState({
      sessionToken: user.sessionToken
    })
  }

  clearToken = () => {
    localStorage.clear();

    this.setState({
      sessionToken: ''
    })
  }

  Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  backgroundImageChange = (roleChange: string ) => {
      this.setState({
        classChange: roleChange
      })
  }

  render() {
    // console.log("Role",this.state.userRole)
    const session = localStorage.getItem("token")
    let container
    if (session !== null) {
      container = <Container>
        <Router>
          <nav id="navbar">
            <ul>
              <li id="name"><a href="#" className="nav-link">Artsee!</a></li>
              <li><Link to="/" className="nav-link" onClick={this.clearToken}> Logout </Link></li>
              <li> <Link to="/myaccount" className="nav-link" > My Account </Link>
              </li>
              <li
                className={localStorage.getItem("role") === this.hashMyString("buyer") ? "" : "hide"}>
                <Link to="/cart" className="nav-link"> Cart </Link>
              </li>
              <li>
                <Link to="/" className="nav-link"> Home </Link>
              </li>
            </ul>
          </nav>
          <div className="navbarRoute">
            <Switch>
              <Route exact path="/">
                <Homepage clearToken={this.clearToken} sessionToken={session} role={this.state.userRole} hashMyString={this.hashMyString} />
              </Route>
              <Route exact path="/cart">
                <Cart sessionToken={this.state.sessionToken} />
              </Route>
              <Route exact path="/checkout">
                <Elements stripe={stripePromise}>
                  <this.InjectedCheckoutForm />
                </Elements>
              </Route>
              <Route exact path="/myaccount">
                <MyAccount sessionToken={session} clearToken={this.clearToken} />
              </Route>
            </Switch>
          </div>
        </Router>
      </Container>
    }
    return (
      <div className={session === null ? this.state.classChange : ""}>
        {container}
        {session === null ?
          <Auth setUserRole={this.setUserRole} updateUser={this.updateUser} backgroundImageChange={this.backgroundImageChange}/> :
          <div />
        }
      </div>
    );
  }
}

export default App;
