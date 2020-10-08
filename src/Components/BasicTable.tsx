import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ItemDetails } from '../Interfaces';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, TextField } from '@material-ui/core';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

type propsData = {
    itemData: [ItemDetails]
}
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
}

// createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// createData('Eclair', 262, 16.0, 24, 6.0),
// createData('Cupcake', 305, 3.7, 67, 4.3),
// createData('Gingerbread', 356, 16.0, 49, 3.9),




const BasicTable: React.FunctionComponent<propsData> = (props) => {
    const rows = props.itemData;

    //   const classes = useStyles();

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
                                <Button>
                                    <EditIcon onClick={()=> alert("Edit")}/>
                                </Button>
                            </TableCell>
                            <TableCell align="right">
                                <DeleteIcon onClick={()=> alert("Delete")}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;