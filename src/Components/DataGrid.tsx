import * as React from 'react';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import { ItemDetails } from '../Interfaces';
import { TextField } from '@material-ui/core';

type propsData = {
  itemData: []
}

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'itemName', headerName: 'Item Name', width: 150 },
  { field: 'itemDescription', headerName: 'Item Description', width: 300 },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 90,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 90,
  },
  { field: 'edit', headerName: 'Edit', width: 300 },
  { field: 'delete', headerName: 'Delete', width: 300 }
];

const ItemDataGrid: React.FunctionComponent<propsData> = (props) => {
  const rows = props.itemData;
  const col1 = <TextField id="new" type="time" value="testing2" />
  const test = [{
    "id": 1,
    "itemName":<TextField id="new" type="time" value="testing2" />,
    "itemDescription": <TextField id="time" type="time" value="testing3" />,
    "quantity": <TextField id="time" type="time" value="testing4" />,
    "price": 1
  }]
  console.log("Data grid", test)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5}  />
    </div>
  );
}

export default ItemDataGrid;