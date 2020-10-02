import React from 'react';
// import './App.css';
import { Auth } from './auth/Auth';

type SessionData = {
  sessionToken: string | null
}

class App extends React.Component<{}, SessionData> {
  constructor(props: {}){
    super(props)

    this.state = {
      sessionToken: ""
    }
  }

  componentDidMount() {
    if(localStorage.getItem('token')){
      this.setState({
        sessionToken: localStorage.getItem('token')
      })
        
    }
  }

   updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken
    })
    // console.log(sessionToken);
  }

   clearToken =  () => {
    localStorage.clear();
    this.setState({
      sessionToken: ''
    })
  }


  render(){
  return (
    <div className="">

      <Auth updateToken={this.updateToken}/>
    </div>
  );
  }
}

export default  App  ;
