import React, { useState} from 'react'
import { FaSearch } from "react-icons/fa";
import { RxDot } from "react-icons/rx";
import { BsWater } from "react-icons/bs";
import { WiStrongWind } from "react-icons/wi";
import './App.css';
import { FaCloudSunRain } from "react-icons/fa";
import { CiCloudOn } from "react-icons/ci";
import { BsCloudDrizzleFill } from "react-icons/bs";
import { FaCloudMoonRain } from "react-icons/fa";
import { LuCloudSnow } from "react-icons/lu";

const WeatherDetails =({icon, temp, city, country, lat, log, loading, humidity, wind, cityNotFound})=>{
  return(
  <>
  <div className='image'>
    {icon}
    {cityNotFound && <p>City Not Found</p>}
    {loading}
  </div>
  <div className='temp'>
    {temp}<RxDot style={{fontSize:'18px', fontWeight:'1000', marginBottom:'25px',}}/>C
  </div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className='data-container'>
    <div className='element'>
      <BsWater className='icon'/>
      <div className='data'>
         <div className='humidity-percent'>{humidity}%</div>
         <div className='text'>humidity</div>
      </div>
      </div>
      <div className='element'>
      <WiStrongWind className='icon'/>
      <div className='data'>
         <div className='wind-percent'>{wind} Km/h</div>
         <div className='text'>wind speed</div>
      </div>
      </div>
  </div>
  </>
  );
};
const App = () => {
  let api_key = "afc79d81c477e5d2c00543c8e4fd2208";

  const [text, setText] = useState("Chennai");
  const[temp, setTemp] = useState(0);
  const[city, setCity] = useState("Chennai");
  const[country, setCountry] = useState("IN");
  const[lat, setLat] = useState(0);
  const[log, setLog] = useState(0);
  const[humidity, setHumidity] = useState(0);
  const[wind, setWind] = useState(0);
  const[cityNotFound, setCityNotFound] = useState(false);
  const[loading, setLoading] = useState(false);
  const[icon, setIcon] = useState(<CiCloudOn/>);
 

 const weatherIconMap ={
    "01d": <CiCloudOn/>,
    "01n": <CiCloudOn/>,
    "02d": <FaCloudSunRain/>,
    "02n": <FaCloudSunRain/>,
    "03d": <BsCloudDrizzleFill/>,
    "03n": <BsCloudDrizzleFill/>,
    "04d": <BsCloudDrizzleFill/>,
    "04n": <BsCloudDrizzleFill/>,
    "09d": <FaCloudMoonRain/>,
    "09n": <FaCloudMoonRain/>,
    "10d": <FaCloudMoonRain/>,
    "10n": <FaCloudMoonRain/>,
    "13d": <LuCloudSnow/>,
    "13n": <LuCloudSnow/>

  }

  const search = async ()=>{
    
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    
    try{
       let res = await fetch(url);
       let data = await res.json();
       if(data.cod ==="404"){
        console.log("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
       }
       setHumidity(data.main.humidity);
       setWind(data.wind.speed);
       setTemp(Math.floor(data.main.temp));
       setCity(data.name);
       setCountry(data.sys.country);
       setLat(data.coord.lat);
       setLog(data.coord.lon);
       const weatherIconCode = data.weather[0].icon;
       setIcon(weatherIconMap[weatherIconCode] || <CiCloudOn />);
       setCityNotFound(false);
         
      

    }catch(error){
      console.error("An error occured:", error.meesage);
    }finally{
      setLoading(false);
    }
  };

  const handleCity =(e)=>{
     setText(e.target.value);
  };
  const handleKeyDown =(e)=>{
    if(e.key === "Enter"){
      search();
    }
  };

  return (
   <>
   <div className='container'>
     <div className='input-container'>
        <input type='text'
         className='cityInput'
          placeholder='Search City'
           onChange={handleCity}
           value={text}
          onKeyDown={handleKeyDown} />
        <div className='search-icon' onClick={()=>search()}>
           <FaSearch style={{marginTop:'-1px',marginRight:'5px'}}/>
        </div>
     </div>
     <WeatherDetails icon={icon} temp={temp} city={city} loading={loading} country={country} lat={lat} log={log} humidity={humidity} wind={wind} cityNotFound={cityNotFound}/>
      
     <p className='copyright'>
        Designed by<span>Imran Expo</span>
      </p>
   </div>
   </>
  )
}

export default App
