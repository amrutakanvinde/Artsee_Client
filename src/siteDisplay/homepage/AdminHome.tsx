import React, { Component } from 'react'
import APIURL from "../../helpers/environment";
import AdminTable from '../tablesListsDatagrids/AdminTable';
import { UserDetails, UserData, Category } from '../../Interfaces';
import EditUserDialog from '../dialogModalsPopups/EditUserDialog';
import ConfirmationDeleteDialog from '../dialogModalsPopups/ConfirmationDeleteUserDialog';
import ConfirmationRoleDialog from '../dialogModalsPopups/ConfiirmationRoleDialog';
import { Button, Table } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import CategoriesTable from '../tablesListsDatagrids/CategoriesTable';
import EditCategoriesDialog from '../dialogModalsPopups/EditCategoriesDialog';
import ConfirmationDeleteCategoryDialog from '../dialogModalsPopups/ConfirmationDeleteCategoryDialog';
import AddCategoryDialog from '../dialogModalsPopups/AddCategoryDialog';

type propsData = {
    sessionToken: string | null,
    editUserModal: boolean,
    editCategoriesModal: boolean,
    snackbarOpen: boolean,
    confirmationDeleteUserModal: boolean,
    confirmationRoleModal: boolean,
    confirmationDeleteCategoryModal: boolean,
    addCategoryModal: boolean,
    handleEditUser: () => void,
    handleAddCategory: () => void,
    handleEditCategory: () => void,
    handleClose: () => void,
    openSnackbar: (str: string) => void,
    handleConfirmationDeleteUser: () => void,
    handleConfirmationRole: () => void,
    handleConfirmationDeleteCategory: () => void,
}

type AdminData = {
    userData: [UserDetails],
    editData: UserDetails | null,
    categoriesData: [Category],
    editCategoriesData: Category | null,
    value: string

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
            categoriesData: [{
                id: 0,
                categoryName: ''
            }],
            editData: null,
            editCategoriesData: null,
            value: "1"
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

    fetchCategories = () => {

        console.log("Fetch categories")
        if (this.props.sessionToken) {
            fetch(`${APIURL}/category/`, {
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
                    // console.log(data.category);
                    this.setState({
                        categoriesData: data.category
                    })
                })
                .catch((err) => alert(err));
        }

    }

    componentDidMount() {
        this.fetchUsers();
        this.fetchCategories();
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

    onEditCategoryLoad = (id: number) => {
        // console.log("Edit Load",id)
        const clickedItem: Category | undefined = this.state.categoriesData.find(el => el.id === id)
        if (clickedItem) {
            this.setState({
                editCategoriesData: clickedItem
            })
            this.props.handleEditCategory();
        }
    }

    closeEditModal = () => {
        this.fetchUsers();
        this.props.handleClose();
    }

    closeAddEditCategoryModal = () => {
        this.fetchCategories();
        this.props.handleClose();
    }

    handleDeleteUser = () => {
        // console.log("Delete Id", editDeleteRole)

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

    handleDeleteCategory = () => {
        // console.log("Delete Id", editDeleteRole)

        if (this.props.sessionToken) {
            fetch(`${APIURL}/category/${editDeleteId}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    this.props.openSnackbar("success");
                    this.props.handleClose();
                    this.fetchCategories()
                })
                .catch((err) => this.props.openSnackbar("error"));
        }
    }

    handleConfirmationDeleteAdmin = (id: number, role: string) => {
        editDeleteId = id;
        editDeleteRole = role;
        this.props.handleConfirmationDeleteUser();
    }

    handleConfirmationDeleteCategory = (id: number) => {
        editDeleteId = id;
        this.props.handleConfirmationDeleteCategory();
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

    handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        this.setState({
            value: newValue
        })
    };

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Admin Home Page</h1>
                <TabContext value={this.state.value}>
                    <AppBar position="static" color="default">
                        <TabList onChange={this.handleChange} aria-label="simple tabs example" centered>
                            <Tab label="List of Users" value="1" />
                            <Tab label="List Of Categories" value="2" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                        <AdminTable userData={this.state.userData} onEditLoad={this.onEditLoad} handleConfirmationDeleteAdmin={this.handleConfirmationDeleteAdmin} handleRoleChangeAtAdmin={this.handleRoleChangeAtAdmin} />
                    </TabPanel>
                    <TabPanel value="2">
                        <Table style={{ textAlign: "right" }}>
                            <Button variant="outlined" style={{ marginBottom: "5px" }} onClick={this.props.handleAddCategory}>Add New Category</Button>
                        </Table>
                        <CategoriesTable categoryData={this.state.categoriesData} onEditCategoryLoad={this.onEditCategoryLoad} handleConfirmationDeleteCategory={this.handleConfirmationDeleteCategory} />
                    </TabPanel>
                </TabContext>

                <AddCategoryDialog sessionToken={this.props.sessionToken} addCategoryModal={this.props.addCategoryModal} handleClose={this.closeAddEditCategoryModal} snackbarOpen={this.props.snackbarOpen} openSnackbar={this.props.openSnackbar} />

                {this.state.editData !== null ?
                    <EditUserDialog sessionToken={this.props.sessionToken}
                        editUserModal={this.props.editUserModal} handleClose={this.closeEditModal} userData={this.state.editData} openSnackbar={this.props.openSnackbar} snackbarOpen={this.props.snackbarOpen} />
                    : ""}

                {this.state.editCategoriesData !== null ?
                    <EditCategoriesDialog sessionToken={this.props.sessionToken}
                        editCategoryModal={this.props.editCategoriesModal} handleClose={this.closeAddEditCategoryModal} categoryData={this.state.editCategoriesData} openSnackbar={this.props.openSnackbar} snackbarOpen={this.props.snackbarOpen} />
                    : ""}

                <ConfirmationDeleteDialog confirmationDeleteModal={this.props.confirmationDeleteUserModal} handleClose={this.props.handleClose} handleDeleteUser={this.handleDeleteUser} />

                <ConfirmationDeleteCategoryDialog confirmationDeleteCategoryModal={this.props.confirmationDeleteCategoryModal} handleClose={this.props.handleClose} handleDeleteCategory={this.handleDeleteCategory} />

                <ConfirmationRoleDialog confirmationRoleModal={this.props.confirmationRoleModal} handleClose={this.props.handleClose} handleRoleChange={this.handleRoleChange} />
            </div>
        )
    }
}
