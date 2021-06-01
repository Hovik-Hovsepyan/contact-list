import React from "react";
import Person from "./components/Person/Person";
import Inputs from "./components/Inputs/Inputs";
import './App.css';
import './components/Person/Person.css';
import './components/Inputs/Inputs.css'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className = "contacts">
        <Inputs />
      </div>
    )
  }
}

export default App;
