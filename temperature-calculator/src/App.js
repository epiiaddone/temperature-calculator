import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

const scaleNames = {
  c: 'Celsius',
  f: 'Farenheit'
}

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

function tryConvert(temperature, convertFunction){
  const input = parseFloat(temperature);
  if(Number.isNaN(input)) return '';

  const output = convertFunction(temperature);
  const rounded = Math.round(output);
  return rounded;
}

class TemperatureInput extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onTemperatureChange(e.target.value);
  }

  render(){
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return(
      <fieldset>
        <legend>Enter Temperature in {scaleNames[scale]}</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
    this.state = {temperature: '', scale: ''}
  }

  handleCelsiusChange(temperature){
    this.setState({scale: 'c', temperature})
  }

  handleFarenheitChange(temperature){
    this.setState({scale: 'f', temperature})
  }

render(){
  const scale = this.state.scale;
  const temperature = this.state.temperature;
  const celsiusTemperature = scale === 'f' ? tryConvert(temperature, farToCel) : temperature;
  const farenheitTemperature = scale === 'c' ? tryConvert(temperature, celToFar) : temperature;
  return(
    <div>
      <TemperatureInput scale='c' temperature={celsiusTemperature} onTemperatureChange={this.handleCelsiusChange}/>
      <TemperatureInput scale='f' temperature={farenheitTemperature} onTemperatureChange={this.handleFarenheitChange}/>
      <BoilingVerdict celsius={celsiusTemperature}/>
    </div>
  )
}
}

function App() {
  return (
<Calculator/>
  );
}

export default App;
