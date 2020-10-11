import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ItemDetails, UserDetails } from '../Interfaces';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import { Button, TextField } from '@material-ui/core';

type propsData = {
    userData: [UserDetails],
    onEditLoad: (id: number) => void,
    handleConfirmationDeleteAdmin: (id: number, role: string) => void,
    handleRoleChangeAtAdmin: (id: number, role: string) => void,
    // handleDelete: (id:number) => void,
}

const AdminTable: React.FunctionComponent<propsData> = (props) => {
    const rows = props.userData;
    // console.log("Admin",rows)
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>User Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Role</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>Grant Admin</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>Edit</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {row.firstName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.lastName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.userName}
                            </TableCell>
                            <TableCell >{row.email}</TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            <TableCell align="center">
                                <Button value={row.id} >
                                    <BrightnessAutoIcon
                                        onClick={() => props.handleRoleChangeAtAdmin(row.id, row.role)}

                                    />
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button value={row.id} >
                                    <EditIcon
                                        onClick={(e) => props.onEditLoad(row.id)}
                                    />
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button>

                                    <DeleteIcon
                                        onClick={() => props.handleConfirmationDeleteAdmin(row.id, row.role)}
                                    />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default AdminTable;