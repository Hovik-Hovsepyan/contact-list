import React, {Component} from 'react';
import Contacts from './components/Contacts';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Contacts />
      </div>   
    )
  }
}

export default App;
