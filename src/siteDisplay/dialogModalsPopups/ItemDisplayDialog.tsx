import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ItemDetails } from '../../Interfaces';

type propsData = {
    itemDisplay: ItemDetails,
    modalOpen: boolean,
    handleClose: () => void,
    addItem: (id: number, quantity: number) => void,
} 

export const ItemDisplayDialog: FunctionComponent<propsData> = (props) => {

  // console.log(props.itemDisplay)
  return (
    <div>
      {props.itemDisplay !== undefined ? 
      <Dialog open={props.modalOpen} onClose={props.handleClose} aria-labelledby="form-dialog-title"  
      BackdropProps = {{invisible: false, classes:{root:'customBackdrop'}}}>
        <DialogTitle id="form-dialog-title">{props.itemDisplay.itemName} Details</DialogTitle>
        <DialogContent>
          <img src={props.itemDisplay.itemImage} style={{maxHeight:'250px', maxWidth:'250px'}}/>
          <DialogContentText>
            {props.itemDisplay.itemDescription}
          </DialogContentText>
  
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {props.addItem(props.itemDisplay.id, 1)}} color="primary">
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
        : ""
        }
    </div>
  );
}

export default  ItemDisplayDialog;