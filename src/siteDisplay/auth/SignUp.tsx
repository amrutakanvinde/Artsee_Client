import React, { Component } from "react";
import APIURL from "../../helpers/environment";
import { FormControl, TextField, Button } from "@material-ui/core";
import { UserData } from "../../Interfaces";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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


    handleSubmit = () => {
        // event.preventDefault();
        console.log("SUBMIT", this.state.firstName, this.state.lastName, this.state.userName, this.state.email, this.state.password, APIURL)

        if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.userName !== "" && this.state.email !== "" && this.state.password !== ""){
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
        } else{
            alert("None of the fields can be empty")
        }

    }

    handleEmailChange = (event: any) => {
        const email = event.target.value;
        this.setState({ email: email })
    }

    handlePasswordChange = (event: any) => {
        const password = event.target.value;
        this.setState({ password: password })
    }

    handleFirstNameChange = (event: any) => {
        const firstName = event.target.value;
        this.setState({ firstName: firstName })
    }

    handleLastNameChange = (event: any) => {
        const lastName = event.target.value;
        this.setState({ lastName: lastName })
    }

    handleUserNameChange = (event: any) => {
        const userName = event.target.value;
        this.setState({ userName: userName })
    }



    render() {

        return (

            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="First Name"
                    onChange={ this.handleFirstNameChange}
                    name="First Name"
                    value={this.state.firstName}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    autoComplete="off"

                />
               <TextValidator
                    label="Last Name"
                    onChange={e => this.handleLastNameChange(e)}
                    name="Last Name"
                    value={this.state.lastName}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    autoComplete="off"

                />
                <TextValidator
                    label="Username"
                    onChange={e => this.handleUserNameChange(e)}
                    name="Userame"
                    value={this.state.userName}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    autoComplete="off"

                />
                <TextValidator
                    label="Email"
                    onChange={e => this.handleEmailChange(e)}
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
                <Button variant="contained" onClick={this.handleSubmit}>Sign Up</Button>
            </ValidatorForm>











            // <FormControl>
            //     <TextField label="First Name" variant="outlined"
            //         onChange={e => {
            //             this.setState({ firstName: e.target.value })
            //         }} />

            //     <br />
            //     <TextField label="Last Name" variant="outlined"
            //         onChange={e => {
            //             this.setState({ lastName: e.target.value })
            //         }} />
            //     <br />
            //     <TextField label="Username" variant="outlined"
            //         onChange={e => {
            //             this.setState({ userName: e.target.value })
            //         }} />
            //     <br />
            //     <TextField label="Email" variant="outlined"
            //         onChange={e => {
            //             this.setState({ email: e.target.value })
            //         }}  />
            //     <br />
            //     <TextField label="Password" variant="outlined"
            //         onChange={e => {
            //             this.setState({ password: e.target.value })
            //         }} />
            //     <br />
            //     <Button variant="contained"  onClick={e => { this.handleSubmit(e) }}>Sign Up</Button>
            // </FormControl>
        )
    }
}

export default SignUp;