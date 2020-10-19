import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/Weather";

const API_KEY = "0eb3f3776f0d047a1156d75138c0d599";
class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;
    
    if(city) {

      const api_url = await 
    fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await api_url.json();

    var sunset = data.sys.sunset;
    var date  = new Date();
    date.setTime(sunset);
    var sunset_date = date.getHour() + ":" + date.getMinutes() + ":" + date.getSeconds();

    this.setState({
      temp: data.main.temp,
      city: data.name,
      country: data.sys.country,
      pressure: data.main.pressure,
      sunset: sunset_date,
      error: undefined
    });
  } else {
    this.setState({
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: "Ввeдите название города"
  });
}
}

  render(){
    return (
      <div>
        <Info />
        <Form weatherMethod={this.gettingWeather} />
        <Weather 
            temp={this.state.temp}
            city={this.state.city}
            country={this.state.country}
            pressure={this.state.pressure}
            sunset={this.state.sunset}
            error={this.state.error} 
        />
      </div>
      );
  }
}

export default App;