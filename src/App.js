
import React, { Component } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import './App.css';
import Slip from './Slip'
//import slip from 'slip';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/scheme/scheme.js');




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
    if(event) event.preventDefault();
    this.setState((prevState, p) => {
      return {eval: Slip(prevState.value)}
    });
  }

  render() {
    var options = {
			lineNumbers: true,
		};
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <h2>Code:</h2>
          <CodeMirror
            value={this.state.value}
            options={options}
            onBeforeChange={(editor, data, value) => {
              this.setState({value});
            }}
            onChange={(editor, data, value) => {
            }}
          />        
        </label>
        <input type="submit" 
          value="Run" 
          onKeyPress={ (e) => {
            if(e.keyCode === 13 && e.ctrlKey)
              this.handleSubmit()
          }
        } />
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
