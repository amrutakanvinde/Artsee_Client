import React, { FunctionComponent } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { Container } from '@material-ui/core';
import StyledContainer from '../styledComponents/StyledContainer'
import { UserData } from '../Interfaces';

type AcceptedProps = {
    updateUser: (user: UserData) => void
}
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