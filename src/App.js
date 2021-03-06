import React, { Component } from "react";

import './App.css';

import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from "./components/Form";

const API_KEY = "215b5eb3112de294a09fa12c2565b959";

class App extends Component {
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

  // convert deg f to deg c
  calCelsius(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeatherIcon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({
          icon: this.weatherIcon.Thunderstorm
        });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({
          icon: this.weatherIcon.Drizzle
        });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({
          icon: this.weatherIcon.Rain
        });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({
          icon: this.weatherIcon.Snow
        });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({
          icon: this.weatherIcon.Atmosphere
        });
        break;
      case rangeID === 800:
        this.setState({
          icon: this.weatherIcon.Clear
        });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({
          icon: this.weatherIcon.Clouds
        });
        break;
      default:
        this.setState({
          icon: this.weatherIcon.Clouds
        });
        break;
    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      //an api call to get data from the weather website
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);

      //catch response and convert it into json
      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_min: this.calCelsius(response.main.temp_min),
        temp_max: this.calCelsius(response.main.temp_max),
        desc: response.weather[0].description,
        err: false
      })

      this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ err: true });
    }
  }

  render() {
    return (
      <div className="app">
        <Form
          err={this.state.err}
          loadWeather={this.getWeather}
        />
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
