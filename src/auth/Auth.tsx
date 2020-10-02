import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';

type AcceptedProps = {
    updateToken: (arg0:string) => void
}

type AuthData = {

}

export class Auth extends Component<AcceptedProps, AuthData> {
    constructor(props: AcceptedProps){
        super(props)
    }

    render() {
        return(
            <div>
                <SignUp updateToken={this.props.updateToken} />
                <Login />
            </div>
        )
    }
}


// export default Auth;