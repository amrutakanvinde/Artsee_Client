import React from 'react';
import './App.css';
import { Auth } from './auth/Auth';
import { Paper, Tabs, Tab, Box, Typography, AppBar, Container } from '@material-ui/core';
import { Homepage } from './homepage/Homepage';
import { UserData } from './Interfaces';
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';


type AppData = {
  sessionToken: string | null,
  userRole: string | null
}

class App extends React.Component<{}, AppData> {
  constructor(props: {}) {
    super(props)

    this.state = {
      sessionToken: localStorage.getItem('token') ? localStorage.getItem('token') : "",
      userRole: "buyer" //find a better solution
    }
  }

  setUserRole = (role: string) => {
    this.setState({
      userRole: role
    })
  }

  updateUser = (user: UserData) => {
    localStorage.setItem('token', user.sessionToken);
    this.setUserRole(user.user.role);
    this.setState({
      sessionToken: user.sessionToken
    })
    // console.log(sessionToken);
  }

  clearToken = () => {
    localStorage.clear();

    this.setState({
      sessionToken: ''
    })
  }
  render() {
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
              <li>
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
                <Homepage clearToken={this.clearToken} sessionToken={session} role={this.state.userRole} />
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
