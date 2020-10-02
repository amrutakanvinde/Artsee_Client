import React, { Component } from "react";
import APIURL from "../helpers/environment";

type propsData = {
    updateToken: (arg0:string) => void
}

type SignupData = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    token: string
}

 class SignUp extends Component<propsData, SignupData> {

    constructor(props: propsData){
        super(props)
        this.state = {
            firstName : "",
            lastName : "",
            userName : "",
            email : "",
            password : "",
            token: ""
        }
    }


     handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        console.log("SUBMIT",this.state.firstName,this.state.lastName,this.state.userName,this.state.email,this.state.password,APIURL)
        
        
        fetch(`${APIURL}/user/signup`, {
            method: "POST",
            body: JSON.stringify({
              user: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password,
                role: "buyer" //change later
              },
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
          .then((res) => {
            if (res.status !== 200) {
              res.json().then(err=> {alert(err.error)})
              throw new Error("fetch error");
            } else return res.json();
          })
          .then((data) => {
              this.setState({
                  token: data.sessionToken
              });
            this.props.updateToken(data.sessionToken);
            console.log(data.sessionToken);
          })
          .catch((err) => console.log(err));
          
    }
    render(){
       
    return(
        <div style = {{textAlign: 'center' }}>
            <h1> Sign Up</h1>
            <form onSubmit= {e => {this.handleSubmit(e)}}>
               <input placeholder="First Name" onChange={e => {
                   this.setState({firstName: e.target.value})
               }}></input>
               <br/>
               <br/>
               <input placeholder="Last Name"  onChange={e => {
                   this.setState({lastName: e.target.value})
               }}></input>
               <br/>
               <br/>
               <input placeholder="Username"  onChange={e => {
                   this.setState({userName: e.target.value})
               }}></input>
               <br/>
               <br/>
               <input placeholder="Email"  onChange={e => {
                   this.setState({email: e.target.value})
               }}></input>
               <br/>
               <br/>
               <input placeholder="Password"  onChange={e => {
                   this.setState({password: e.target.value})
               }}></input>
               <br/>
               <br/>
               <button type="submit">Sign Up</button>
            </form>
        </div>
    )
    }
}

export default SignUp;