import React, { Component } from 'react'
import APIURL from "../../helpers/environment";
import AdminTable from '../../components/AdminTable';
import { UserDetails, UserData } from '../../Interfaces';
import EditUserDialog from '../../components/EditUserDialog';


type propsData = {
    sessionToken: string | null,
    editUserModal: boolean,
    snackbarOpen: boolean,
    handleEditUser: () => void,
    handleClose: () => void,
    openSnackbar: (str: string) => void,
}

type AdminData = {
    userData: [UserDetails],
    editData: UserDetails | null

}

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

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <AdminTable userData={this.state.userData} onEditLoad={this.onEditLoad}/>

                {this.state.editData !== null ?
                <EditUserDialog sessionToken={this.props.sessionToken} 
                editUserModal={this.props.editUserModal} handleClose={this.closeEditModal}  userData={this.state.editData} openSnackbar= {this.props.openSnackbar} snackbarOpen={this.props.snackbarOpen}/>
                : ""}
            </div>
        )
    }
}
