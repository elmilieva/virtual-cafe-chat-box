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

  // change <nav> to a <Navigation> react component
  // for register have a handler that takes the newly created react model User
  // and sends it to the UserService, which sends it to the server POST user endpoint
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
