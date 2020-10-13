import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import APIURL from "../../helpers/environment";
import { UserDetails } from '../../Interfaces';
import ConfirmationDeleteDialog from '../dialogModalsPopups/ConfirmationDeleteDialog';


type propsData = {
    sessionToken: string,
    // confirmationDeleteModal: boolean,
    // handleConfirmationDelete: () => void,
    clearToken: () => void,
}

type AccountData = {
    userData: UserDetails
    email: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    id: number | undefined,
    // password: string,
    role: string | undefined,
    userName: string | undefined,
    confirmationDeleteModal: boolean,
}

export default class MyAccount extends Component<propsData, AccountData> {
    constructor(props: propsData) {
        super(props)

        this.state = {
            userData: {
                email: '',
                firstName: '',
                lastName: '',
                id: 0,
                role: '',
                password: '',
                userName: ''
            },
            email: '',
            firstName: '',
            lastName: '',
            id: 0,
            role: '',
            userName: '',
            confirmationDeleteModal: false
        }
    }

    componentDidMount() {
        this.fetchUser()
    }

    fetchUser = () => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/user/`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        throw new Error("Error");
                    } else return res.json();
                })
                .then((data) => {
                    // console.log("User", data.users);
                    this.setState({
                        email: data.users.email,
                        firstName: data.users.firstName,
                        lastName: data.users.lastName,
                        id: data.users.id,
                        role: data.users.role,
                        userName: data.users.userName
                    })
                })
                .catch((err) => alert(err));
        }
    }

    editUser = () => {

        console.log("On Edit")
        if (this.props.sessionToken) {

            fetch(`${APIURL}/user/${this.state.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    user: {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        userName: this.state.userName,
                        email: this.state.email,
                        role: this.state.role,
                    },
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    if (res.status !== 200) {
                        res.json().then(err => { alert(err.error) })
                        throw new Error("fetch error");
                    }
                    else {
                        console.log("User edited successfully")

                    }
                })
                .catch((err) => console.log("error", err));
        }
    }

    handleClose = () => {
        this.setState({
            confirmationDeleteModal: false
        })

    };

    handleDelete = () => {
        console.log("Delete Id")

        if (this.props.sessionToken) {

            fetch(`${APIURL}/user/${this.state.id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    console.log("User deleted")
                    this.props.clearToken();
                })
                .catch((err) => console.log("error", err));

        }
    }

    render() {
        return (
            <form className="divHome centerAlign">
                <h1>My Account</h1>
                <TextField label="First Name" variant="outlined"
                    value={this.state.firstName}
                    onChange={e => {
                        this.setState({ firstName: e.target.value })
                    }}
                ></TextField>
                <br />
                <br />

                <TextField label="Last Name" variant="outlined"
                    value={this.state.lastName}
                    onChange={e => {
                        this.setState({ lastName: e.target.value })
                    }}
                />
                <br />
                <br />
                <TextField label="User Name" variant="outlined"
                    value={this.state.userName}
                    onChange={e => {
                        this.setState({ userName: (e.target.value) })
                    }}
                />
                <br />
                <br />
                <TextField label="Email" variant="outlined"
                    value={this.state.email}
                    onChange={e => {
                        this.setState({ email: (e.target.value) })
                    }}
                />
                <br />
                <br />
                <TextField label="Password" variant="outlined"
                    
                    // onChange={e => {
                    //     this.setState({ email: (e.target.value) })
                    // }}
                />
                <br />
                <br />

                <Button color="primary"
                    onClick={this.editUser}
                >
                    Save Changes
                </Button>
                <Button color="primary" onClick={() => {
                    this.setState({
                        confirmationDeleteModal: true
                    })
                }} >
                    Delete Account
                </Button>


                <ConfirmationDeleteDialog confirmationDeleteModal={this.state.confirmationDeleteModal} handleClose={this.handleClose} handleDelete={this.handleDelete} />
            </form>

        )
    }
}