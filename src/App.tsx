import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import Home from './components/Home'
import NotFound from './components/NotFound'
import InputTextBox from "./components/InputTextBox";
import UnitDropDowns from "./components/UnitDropDowns"
import {Route, Routes} from 'react-router-dom';
// import { useNavigate } from 'react-router'
import "./App.css";

function App() {
  const [convertUnit, setConvertUnit] = useState("");   //is it distance, volume, area, etc?
  const [unitBases, setUnitBases] = useState([""]);

  const distanceUnitBases=["feet","meter","mile"]
  const areaUnitBases=["square meters","square feet","square miles"]
  const volumeUnitBases=["gallons","liters"]
  const temperatureUnitBases=["Fahrenheit","Celsius","Kelvin"]
  // const navigate=useNavigate()


  return (
    //container holds the entire thing
    <div className="container">
      <div className="sidebar">
        <button onClick={() => {setConvertUnit("Distance"); setUnitBases(distanceUnitBases)}}>Distance</button>
        <button onClick={() => {setConvertUnit('Volume'); setUnitBases(volumeUnitBases)}}>Volume</button>
        <button onClick={() => {setConvertUnit('Area'); setUnitBases(areaUnitBases)}}>Area</button>
        <button onClick={() => {setConvertUnit('Temperature'); setUnitBases(temperatureUnitBases)}}>Temperature</button>
      </div>
      
      <div className="applet">
        
        <h1>Unit Converter</h1>
        <h3>{convertUnit}</h3>
        {/* <Link to='/home' onClick={() => navigate('/home')}>home link</Link> */}
        {/* <Link to='/home1' onClick={() => navigate(1)}>Bad</Link> */}
        {/* <Link to='/' onClick={() => navigate(1)}>main</Link> */}
        <UnitDropDowns unitType={unitBases}/>
        <InputTextBox/>

        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<br />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      {/* The forbidden zone */}
    </div>
  );
}

export default App;
