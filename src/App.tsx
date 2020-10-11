import React from 'react';
import './App.css';
import { Auth } from './auth/Auth';
import { Paper, Tabs, Tab, Box, Typography, AppBar, Container, Snackbar, Button } from '@material-ui/core';
import { Homepage } from './siteDisplay/homepage/Homepage';
import { UserData } from './Interfaces';
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import Cart from './siteDisplay/Cart';
import Checkout from './siteDisplay/Checkout';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

type AppData = {
  sessionToken: string | null,
  userRole: string | null,
  modalOpen: boolean
}

class App extends React.Component<{}, AppData> {
  constructor(props: {}) {
    super(props)
    
    this.state = {
      sessionToken: localStorage.getItem('token') ? localStorage.getItem('token') : "",
      userRole: localStorage.getItem('role') ? localStorage.getItem('role') : "",
      modalOpen: false
    }
  }
  
  hashMyString = (valueToHash : string) => {
    
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

  handleOpen = () => {
    console.log("Open")
    this.setState({
        modalOpen: true
    })
  };

   handleClose = () => {
    this.setState({
        modalOpen: false
    })
  };

  Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  successAlert = () => {
    console.log("SnackBr")
    return (
      <Snackbar open={this.state.modalOpen} autoHideDuration={6000} onClose={this.handleClose}>
      <this.Alert onClose={this.handleClose} severity="success">
        This is a success message!
      </this.Alert>
    </Snackbar>
    )
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
              <li><a href="#" className="nav-link">My Account</a></li>
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
                <Homepage clearToken={this.clearToken} sessionToken={session} role={this.state.userRole} hashMyString={this.hashMyString} successAlert={this.successAlert}/>
              </Route>
              <Route exact path="/cart">
                <Cart sessionToken={this.state.sessionToken} />
              </Route>
              <Route exact path="/checkout">
                <Checkout  />
              </Route>
            </Switch>
          </div>
        </Router>
      </Container>
    }
    return (
      <div className={session === null ? "mainDiv" : ""}>
        {container}
        {session === null ?
          <Auth setUserRole={this.setUserRole} updateUser={this.updateUser} /> :
          <div />
        }
      </div>
    );
  }
}

export default App;
