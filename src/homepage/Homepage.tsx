import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BuyerHome } from './BuyerHome';

type HomeData = {

}

type propsData = {
  clearToken: () => void,
  sessionToken : string | null
}

export class Homepage extends Component<propsData, HomeData> {
    constructor(props: propsData){
        super(props)
    }

    render(){
        return(
            <div className="divHome">
                {/* <h1 style={{color:"black"}}> Home</h1>  */}
                <Button
                onClick={this.props.clearToken}
                id="logoutbutton" color="secondary">
                Logout
              </Button>
              <BuyerHome sessionToken={this.props.sessionToken}/>
            </div>
        )
    }
}