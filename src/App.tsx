import React from 'react';
import './App.css';
import { Auth } from './auth/Auth';
import { Paper, Tabs, Tab, Box, Typography, AppBar, Container } from '@material-ui/core';
import { Homepage } from './homepage/Homepage';
import { UserData } from './Interfaces';

type AppData = {
  sessionToken: string | null,
  userRole: string | null
}

class App extends React.Component<{}, AppData> {
  constructor(props: {}) {
    super(props)

    this.state = {
      sessionToken: localStorage.getItem('token')? localStorage.getItem('token'): "",
      userRole: null
    }
  }

  setUserRole = (role: string) => {
    this.setState({
      userRole: role
    })
    // console.log("role",role)
  }

  updateUser = (user: UserData) => {
    localStorage.setItem('token', user.sessionToken);
    this.setUserRole(user.user.role);
    // console.log("user", user.user.role)
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
    return (
      <div className={session === null ? "mainDiv" : ""}>
        <Typography component="nav">

        </Typography>
        {session === null ?
          <Auth setUserRole={this.setUserRole} updateUser={this.updateUser}/> :
          <Homepage clearToken={this.clearToken} sessionToken= {session}  role={this.state.userRole}/>
        }
      </div>
    );
  }
}

export default App;
