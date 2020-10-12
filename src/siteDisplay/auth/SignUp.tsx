import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { FormControl, TextField, Button } from "@material-ui/core";
import { UserData } from "../../Interfaces";

type propsData = {
    updateUser: (user: UserData) => void,
    role: string
}

type SignupData = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    token: string
}

class SignUp extends Component<propsData, SignupData> {

    constructor(props: propsData) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            token: ""
        }
    }


    handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("SUBMIT", this.state.firstName, this.state.lastName, this.state.userName, this.state.email, this.state.password, APIURL)


        fetch(`${APIURL}/user/signup`, {
            method: "POST",
            body: JSON.stringify({
                user: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    userName: this.state.userName,
                    email: this.state.email,
                    password: this.state.password,
                    role: this.props.role
                },
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((res) => {
                if (res.status !== 200) {
                    res.json().then(err => { alert(err.error) })
                    throw new Error("fetch error");
                } else return res.json();
            })
            .then((data) => {
                this.setState({
                    token: data.sessionToken
                });
                this.props.updateUser(data);
                console.log(data.sessionToken);
            })
            .catch((err) => console.log(err));

    }
    render() {

        return (
            <FormControl>
                <TextField label="First Name" variant="outlined"
                    onChange={e => {
                        this.setState({ firstName: e.target.value })
                    }} />

                <br />
                <TextField label="Last Name" variant="outlined"
                    onChange={e => {
                        this.setState({ lastName: e.target.value })
                    }} />
                <br />
                <TextField label="Username" variant="outlined"
                    onChange={e => {
                        this.setState({ userName: e.target.value })
                    }} />
                <br />
                <TextField label="Email" variant="outlined"
                    onChange={e => {
                        this.setState({ email: e.target.value })
                    }}  />
                <br />
                <TextField label="Password" variant="outlined"
                    onChange={e => {
                        this.setState({ password: e.target.value })
                    }} />
                <br />
                <Button variant="contained"  onClick={e => { this.handleSubmit(e) }}>Sign Up</Button>
            </FormControl>
        )
    }
}

export default SignUp;