import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import Search_icon from "../assets/search.png";
import Clear_icon from "../assets/clear.png";
import Cloud_icon from "../assets/cloud.png";
import Drizzle_icon from "../assets/drizzle.png";
import Humidity_icon from "../assets/humidity.png";
import Rain_icon from "../assets/rain.png";
import Snow_icon from "../assets/snow.png";
import Wind_icon from "../assets/wind.png";


 

const Weather = () => {

  const inputref =useRef();

const [WeatherData,setWeatherData]=useState(false);

const allIcon={

  "01d":Clear_icon,
  "01n":Clear_icon,
  "02d":Cloud_icon,
  "02n":Cloud_icon,
  "03d":Cloud_icon,
  "03n":Cloud_icon,
  "04d":Drizzle_icon,
  "04n":Drizzle_icon,
  "09d":Rain_icon,
  "09n":Rain_icon,
  "010d":Rain_icon,
  "10n":Rain_icon,
  "13d":Snow_icon,
  "13n":Snow_icon,

}

const search =async(city)=>{
if(city === "")
{
  alert("please enter city")
  return;
}

  try {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok)
    {
      alert(data.message);
      return;
    }

    console.log(data);

    const icon=allIcon[data.weather[0].icon]

    setWeatherData({
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location:data.name,
      icon: icon,
    })

  } catch (error) {
    setWeatherData(false);
    console.log("Error in fetching weather data");
  }

}

useEffect(()=>{
 search("pune");
},[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputref} type="text" name="" id="" placeholder='Search' />
        <img src={Search_icon} alt="" onClick={()=>search(inputref.current.value)} />
      </div>

      {WeatherData?<>
        <img src={WeatherData.icon} alt="" className='weather_icon' />
        <p className='temprature'>{WeatherData.temperature}°C</p>
        <p className='location'>{WeatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={Humidity_icon} alt="" />
            <div>
              <p>{WeatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={Wind_icon} alt="" />
            <div>
              <p>{WeatherData.windSpeed}km/h</p>
              <span>Wind speed</span>
            </div>
          </div>
        </div>
      </>:<></>}
        
    </div>
  )
}

export default Weather