import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ItemDetails } from '../../Interfaces';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, TextField } from '@material-ui/core';

type propsData = {
    itemData: [ItemDetails],
    onEditLoad: (id:number) => void,
    handleDelete: (id:number) => void,
}

const SellerTable: React.FunctionComponent<propsData> = (props) => {
    const rows = props.itemData;
    return (
        <TableContainer component={Paper}>
            <Table
                //   className={classes.table} 
                aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell >Description</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <img src={row.itemImage} style={{maxHeight:'50px', maxWidth:'50px'}}/>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.itemName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.itemDescription}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">
                                <Button value={row.id} >
                                    <EditIcon  onClick={(e)=> props.onEditLoad(row.id)}/>
                                </Button>
                            </TableCell>
                            <TableCell align="right">
                                <DeleteIcon onClick={()=> props.handleDelete(row.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default SellerTable;