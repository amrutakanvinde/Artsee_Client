import React from 'react';
import { withStyles, Theme, Fade, Container } from '@material-ui/core';


const StyledFade = withStyles({
  root: {
    backgroundColor: "pink",
    border: '2px solid #000',
    boxShadow: '5px 10px #888888',
    padding: '2px 4px 3px',
  }
})(Container)

export default StyledFade;