import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { Container, Typography, withStyles } from '@material-ui/core';
// import StyledContainer from '../../styledComponents/StyledContainer'
import { UserData } from '../../Interfaces';


type AcceptedProps = {
    updateUser: (user: UserData) => void
}

type SellerData = {
    isOpen: boolean
}

const StyledContainer = withStyles ({
    root:{
        width: '100%',
        textAlign: 'center',
        margin: 'auto',
      //   backgroundColor: 'white'
    }  
  })(Container)
  
export class Seller extends Component<AcceptedProps, SellerData> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            isOpen: true
        }
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <StyledContainer maxWidth="sm">
                {this.state.isOpen ?
                    <StyledContainer>
                        <Login updateUser={this.props.updateUser} />
                        <Typography variant="subtitle2">Don't have an account?<a href="#" onClick={this.toggle}>Sign Up</a></Typography>
                    </StyledContainer> :
                    <StyledContainer>
                        <SignUp updateUser={this.props.updateUser} role="seller" />
                        <Typography component={"div"} variant="subtitle2">Go back?<a href="#" onClick={this.toggle}>Login</a></Typography>
                    </StyledContainer>
                }
            </StyledContainer>
        )
    }
}


// export default Auth;