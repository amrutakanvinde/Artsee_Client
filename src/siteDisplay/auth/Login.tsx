import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { FormControl, TextField, Button, InputLabel, Input, InputAdornment, IconButton, OutlinedInput } from '@material-ui/core';
import { UserData } from "../../Interfaces";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type propsData = {
  updateUser: (user: UserData) => void
}

type LoginData = {
  email: string,
  password: string
  values: State
}

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

class Login extends Component<propsData, LoginData> {
  constructor(props: propsData) {
    super(props)
    this.state = {
      email: "",
      password: "",
      values: {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      }
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

  handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      values: ({ ...this.state.values, [prop]: event.target.value })
    })
  };

  handleClickShowPassword = () => {
    this.setState({
      values: ({ ...this.state.values, showPassword: !this.state.values.showPassword })
    })
  };

  handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  render() {
    return (
      <FormControl  >
        <TextField label="Email" variant="outlined" required
          onChange={e => {
            this.setState({ email: e.target.value })
          }} />
        <br />
        {/* <TextField label="Password" variant="outlined" type="password"
          onChange={e => {
            this.setState({ password: e.target.value })
          }} /> */}
        <FormControl variant="outlined" required style={{ margin:"1",  }}>

          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="standard-adornment-password"
            type={this.state.values.showPassword ? 'text' : 'password'}
            value={this.state.values.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <br />
        <Button variant="contained" onClick={e => { this.handleSubmit(e) }}>Login</Button>
      </FormControl>
    )
  }
}

export default Login;