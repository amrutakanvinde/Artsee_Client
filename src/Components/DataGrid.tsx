import * as React from 'react';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import { ItemDetails } from '../Interfaces';

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
    
  console.log("Data grid", props.itemData)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5}  />
    </div>
  );
}

export default ItemDataGrid;