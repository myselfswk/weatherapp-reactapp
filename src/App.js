import React, { Component } from "react";

import './App.css';

import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

const API_KEY = "215b5eb3112de294a09fa12c2565b959";

class App extends Component {
  constructor() {
    super();
    this.getWeather();
  }
  state = {
    city: undefined,
    country: undefined,
    icon: undefined,
    mainTemp: undefined,
    celsius: undefined,
    temp_min: undefined,
    temp_max: undefined,
    desc: "",
    err: false
  };

  weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  }

  calCelsius(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeatherIcon(icons, rangeID) {
    
  }

  getWeather = async () => {
    //an api call to get data from the weather website
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`)

    //catch response and convert it into json
    const response = await api_call.json();

    this.setState({
      city: response.name,
      country: response.sys.country,
      celsius: this.calCelsius(response.main.temp),
      temp_min: this.calCelsius(response.main.temp_min),
      temp_max: this.calCelsius(response.main.temp_max),
      desc: response.weather[0].description,
      icon: this.weatherIcon.Thunderstorm
    })

    console.log(response);
  }

  render() {
    return (
      <div className="app">
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          desc={this.state.desc}
          weatherIcon={this.state.icon}
        />
      </div>
    )
  }
}

export default App;