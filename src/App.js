import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slip from './Slip'
//import slip from 'slip';

class CodeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '(+ 1 2)',
      eval: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
    this.setState((prevState, p) => {
      return {eval: Slip(prevState.value)}
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <h2>Code:</h2>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <div>
          <h2>Output:</h2>
          <div>{this.state.eval}</div>
        </div>
      </form>
    );
  }
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1 className="App-title">SLIP</h1>
        <p className="App-intro">
          Slip is a fun little Lisp. 
          So far, it only does simple math. Give it a try!
        </p>
        <div>
          <CodeForm/>
        </div>
      </div>
    );
  }
}

export default App;
