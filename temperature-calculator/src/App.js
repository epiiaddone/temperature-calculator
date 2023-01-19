import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

function BoilingVerdict(props){
  if(props.celsius >= 100) return <p>The water is boiling</p>;
  else return <p>The water is not boiling</p>;
}

function celToFar(celsius){
  return celsius * 1.8 + 32;
}

function farToCel(farenheit){
  return (farenheit - 32) / 1.8;
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e){
    this.setState({temperature: e.target.value})
  }

  render(){
    const temperature = this.state.temperature;
    return(
      <fieldset>
        <ledgend>Enter Temperature in Celsius</ledgend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)}/>
      </fieldset>
    )
  }
}

function App() {
  return (
<Calculator/>
  );
}

export default App;
