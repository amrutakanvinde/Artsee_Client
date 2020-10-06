import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import { Container, Typography, withStyles } from '@material-ui/core';
import StyledContainer from '../StyledComponents/StyledContainer'
import { UserData } from '../Interfaces';

type AcceptedProps = {
    updateUser: (user: UserData) => void
}

type BuyerData = {
    isOpen: boolean
}
  
export class Buyer extends Component<AcceptedProps, BuyerData> {
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
            <StyledContainer>
                {this.state.isOpen ?
                    <StyledContainer >
                        <Login updateUser={this.props.updateUser} />
                        <Typography variant="subtitle2">Don't have an account?<a href="#" onClick={this.toggle}>Sign Up</a></Typography>
                    </StyledContainer>
                    :
                    <StyledContainer>
                        <SignUp updateUser={this.props.updateUser} role="buyer" />
                        <Typography component={"div"} variant="subtitle2">Go back?<a href="#" onClick={this.toggle}>Login</a></Typography>
                    </StyledContainer>
                }
            </StyledContainer>
        )
    }
}
