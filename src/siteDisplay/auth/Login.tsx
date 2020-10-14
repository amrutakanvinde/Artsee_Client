import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { FormControl, TextField, Button, InputLabel, Input, InputAdornment, IconButton, OutlinedInput } from '@material-ui/core';
import { UserData } from "../../Interfaces";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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

  handleSubmit = () => {
    // event.preventDefault();
    // console.log("GHERE")
    if (this.state.email !== "" && this.state.password !== "") {
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
    } else {
      alert("Email and/or Password cannot be blank")
    }
  };

  handleEmailChange = (event: any) => {
    const email = event.target.value;
    this.setState({ email: email })
  }

  handlePasswordChange = (event: any) => {
    const password = event.target.value;
    this.setState({ password: password })
  }

  render() {
    return (
      
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label="Email"
          onChange={this.handleEmailChange}
          name="email"
          value={this.state.email}
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
          autoComplete="off"

        />

        <TextValidator
          label="Password"
          onChange={this.handlePasswordChange}
          name="password"
          type="password"
          validators={['minStringLength:4', 'required']}
          errorMessages={['password should be more than 4 letters', 'this field is required']}
          value={this.state.password}
        />
        <br />
        <Button variant="contained" onClick={this.handleSubmit}>Login</Button>
      </ValidatorForm>

    )
  }
}

export default Login;