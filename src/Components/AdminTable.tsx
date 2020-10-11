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
    onEditLoad: (id:number) => void,
    // handleDelete: (id:number) => void,
}

const AdminTable: React.FunctionComponent<propsData> = (props) => {
    const rows = props.userData;
    console.log("Admin",rows)
    return (
        <TableContainer component={Paper}>
            <Table
                //   className={classes.table} 
                aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell >User Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="center">Grant Admin</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
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
                                    // onClick={(e)=> props.onEditLoad(row.id)}
                                    />
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button value={row.id} >
                                    <EditIcon  
                                    onClick={(e)=> props.onEditLoad(row.id)}
                                    />
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button>

                                <DeleteIcon 
                                // onClick={()=> props.handleDelete(row.id)}
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