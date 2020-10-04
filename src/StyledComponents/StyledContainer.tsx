import React from 'react';
import { Container, withStyles } from '@material-ui/core';


 const StyledContainer = withStyles ({
    root:{
        width: '100%',
        textAlign: 'center',
        margin: 'auto',
      //   backgroundColor: 'white'
    }  
  })(Container)

  export default StyledContainer;