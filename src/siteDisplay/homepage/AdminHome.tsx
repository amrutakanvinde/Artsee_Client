import React, { Component } from 'react'
import APIURL from "../../helpers/environment";
import AdminTable from '../tablesListsDatagrids/AdminTable';
import { UserDetails, UserData } from '../../Interfaces';
import EditUserDialog from '../dialogModalsPopups/EditUserDialog';
import ConfirmationDeleteDialog from '../dialogModalsPopups/ConfirmationDeleteDialog';
import ConfirmationRoleDialog from '../dialogModalsPopups/ConfiirmationRoleDialog';


type propsData = {
    sessionToken: string | null,
    editUserModal: boolean,
    snackbarOpen: boolean,
    confirmationDeleteModal: boolean,
    confirmationRoleModal: boolean,
    handleEditUser: () => void,
    handleClose: () => void,
    openSnackbar: (str: string) => void,
    handleConfirmationDelete: () => void,
    handleConfirmationRole: () => void,
}

type AdminData = {
    userData: [UserDetails],
    editData: UserDetails | null

}
let editDeleteId: number = 0; let editDeleteRole: string = "";
export default class AdminHome extends Component<propsData, AdminData> {
    constructor(props: propsData) {
        super(props)
        this.state = {
            userData: [{
                email: '',
                firstName: '',
                lastName: '',
                id: 0,
                password: '',
                role: '',
                userName: ''
            }],
            editData: null
        }
    }

    fetchUsers = () => {
        if (this.props.sessionToken) {
            // console.log("Fetch")
            fetch(`${APIURL}/user/all`, {
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
                    // console.log("User Data",data.users);
                    this.setState({
                        userData: data.users
                    })
                })
                .catch((err) => alert(err));
        }
    }

    componentDidMount() {
        this.fetchUsers()
    }

    onEditLoad = (id: number) => {
        // console.log("Edit Load",id)
        const clickedItem: UserDetails | undefined = this.state.userData.find(el => el.id === id)
        if (clickedItem) {
            this.setState({
                editData: clickedItem
            })
            this.props.handleEditUser();
        }
    }

    closeEditModal = () => {
        this.fetchUsers();
        this.props.handleClose();
    }

    handleDelete = () => {
        console.log("Delete Id", editDeleteRole)

        if (this.props.sessionToken) {
            if (editDeleteRole !== "admin") {
                fetch(`${APIURL}/user/${editDeleteId}`, {
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        'Authorization': this.props.sessionToken
                    }),
                })
                    .then((res) => {
                        this.props.openSnackbar("success");
                        this.props.handleClose();
                        this.fetchUsers()
                    })
                    .catch((err) => this.props.openSnackbar("error"));
            } else {
                alert("Admin cannot be deleted")
            }
        }
    }

    handleConfirmationDeleteAdmin = (id: number, role: string) => {
        editDeleteId = id;
        editDeleteRole = role;
        this.props.handleConfirmationDelete();
    }

    handleRoleChange = () => {
        // console.log("Role Change", editDeleteId, editDeleteRole)
        if (this.props.sessionToken) {

            fetch(`${APIURL}/user/${editDeleteId}`, {
                method: "PUT",
                body: JSON.stringify({
                    user: {
                        role: "admin",
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
                        // console.log("Role chnaged successfully")
                        this.props.handleClose();
                        this.props.openSnackbar("success");
                        this.fetchUsers();
                    }
                })
                .catch((err) => this.props.openSnackbar("error"));
        }
    }

    handleRoleChangeAtAdmin = (id: number, role: string) => {
        editDeleteId = id;
        editDeleteRole = role;
        this.props.handleConfirmationRole();
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign:"center"}}>Admin Home Page</h1>
                <AdminTable userData={this.state.userData} onEditLoad={this.onEditLoad} handleConfirmationDeleteAdmin={this.handleConfirmationDeleteAdmin} handleRoleChangeAtAdmin={this.handleRoleChangeAtAdmin} />

                {this.state.editData !== null ?
                    <EditUserDialog sessionToken={this.props.sessionToken}
                        editUserModal={this.props.editUserModal} handleClose={this.closeEditModal} userData={this.state.editData} openSnackbar={this.props.openSnackbar} snackbarOpen={this.props.snackbarOpen} />
                    : ""}

                <ConfirmationDeleteDialog confirmationDeleteModal={this.props.confirmationDeleteModal} handleClose={this.props.handleClose} handleDelete={this.handleDelete} />

                <ConfirmationRoleDialog confirmationRoleModal={this.props.confirmationRoleModal} handleClose={this.props.handleClose} handleRoleChange={this.handleRoleChange} />
            </div>
        )
    }
}
