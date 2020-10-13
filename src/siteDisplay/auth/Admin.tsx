import React, { FunctionComponent } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { Container } from '@material-ui/core';
// import StyledContainer from '../../styledComponents/StyledContainer'
import { UserData } from '../../Interfaces';
import { withStyles } from '@material-ui/styles';

type AcceptedProps = {
    updateUser: (user: UserData) => void
}

const StyledContainer = withStyles ({
    root:{
        width: '100%',
        textAlign: 'center',
        margin: 'auto',
      //   backgroundColor: 'white'
    }  
  })(Container)

export const Admin: FunctionComponent<AcceptedProps> = (props) => {
    return (
        <StyledContainer maxWidth="sm">
            <StyledContainer>
                <Login updateUser={props.updateUser} />
            </StyledContainer>
        </StyledContainer>
    )
}


// export default Admin;