import React from 'react';
import './App.css';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { Home } from './Components/Home/Home';


interface indexState {
  loginClicked: boolean
}

class App extends React.Component<{}, indexState>{
  state = {
    loginClicked: false
  }
  constructor(props: {}) {
    super(props);
    this.loginClicked = this.loginClicked.bind(this);
  }
  render() {
    //https://codepen.io/marko-zub/pen/NpYwyr
    return (
      <div className="App">
        <nav>
          
          <div>
            <p>HOME</p>
            <p onClick={this.loginClicked}>LOGIN</p>
            <p>REGISTER</p>
          </div>
        </nav>
        
        <Home/>
      </div>
    );
  }
  loginClicked() {
    //this.setState(() => { loginClicked: true });
  }
}


export default App;
