import React, { FunctionComponent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Backdrop } from '@material-ui/core';

type propsData = {
    handleOpen: () => void,
    handleClose: () => void,
    modalOpen: boolean 
}

const SimpleModal: FunctionComponent<propsData> = (props) => {
  const body = (
    <div style={{ 
    position: 'absolute',
    width: 400,
    backgroundColor: 'pink',
    border: '2px solid #000',
    boxShadow: '5px 5px #888888',
    padding:'2px 4px 3px',
    top: '50px',
    left: '50px'
    }}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );
  return (
    <div>
      <Modal
        open={props.modalOpen}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps = {{invisible: false, classes:{root:'customBackdrop'}}}

      >
        {body}
      </Modal>
    </div>
  );
}

export default SimpleModal