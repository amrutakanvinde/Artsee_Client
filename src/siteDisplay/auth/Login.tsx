import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { FormControl, TextField, Button } from '@material-ui/core';
import { UserData } from "../../Interfaces";

type propsData = {
  updateUser: (user: UserData) => void
}

type LoginData = {
  email: string,
  password: string
}

class Login extends Component<propsData, LoginData> {
  constructor(props: propsData) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    // console.log("GHERE")
    fetch(`${APIURL}/user/login/`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("User does not exist");
        } else return res.json();
      })
      .then((data) => {
        // console.log(data);
        // this.props.updateToken(data.sessionToken);
        this.props.updateUser(data);
        console.log("User successfully logged in");
      })
      .catch((err) => alert(err));
  };

  render() {
    return (
      <FormControl >
        <TextField label="Email" variant="outlined"
          onChange={e => {
            this.setState({ email: e.target.value })
          }} />
        <br />
        <TextField label="Password" variant="outlined" type="password"
          onChange={e => {
            this.setState({ password: e.target.value })
          }} />
        <br />
        <Button variant="contained" onClick={e => { this.handleSubmit(e) }}>Login</Button>
      </FormControl>
    )
  }
}

export default Login;