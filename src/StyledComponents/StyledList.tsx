import React from 'react';
import { List, withStyles } from '@material-ui/core';


 const StyledList = withStyles ({
    root:{
        width: '1000px',
        margin: 'auto', 
        marginTop: '50px' 
    }  
  })(List)

  export default StyledList;