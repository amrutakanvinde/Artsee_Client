import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Category } from '../../Interfaces';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import { Button, TextField } from '@material-ui/core';

type propsData = {
    categoryData: [Category],
    onEditCategoryLoad: (id: number) => void,
    handleConfirmationDeleteCategory: (id: number) => void
}

const CategoriesTable: React.FunctionComponent<propsData> = (props) => {
    const rows = props.categoryData;
    // console.log("Admin",rows)
    return (
        <TableContainer component={Paper}>
            {/* <Table style={{textAlign: "right"}}>
                <Button variant="outlined" style={{ marginBottom: "5px" }}>Add New Category</Button>

            </Table> */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Category Name</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>Edit</TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold' }}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                {row.categoryName}
                            </TableCell>
                            <TableCell align="center">
                                <Button value={row.id} >
                                    <EditIcon
                                        onClick={(e) => props.onEditCategoryLoad(row.id)}
                                    />
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button>
                                    <DeleteIcon
                                        onClick={() => props.handleConfirmationDeleteCategory(row.id)}
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

export default CategoriesTable;