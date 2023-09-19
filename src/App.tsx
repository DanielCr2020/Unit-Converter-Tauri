import { useState } from "react";
import Home from './components/Home'
import NotFound from './components/NotFound'
import InputAndConvert from "./components/InputAndConvert";
import {Route, Routes} from 'react-router-dom';
// import { useNavigate } from 'react-router'
import "./App.css";

function App() {
  const [convertUnit, setConvertUnit] = useState("");   //is it distance, volume, area, etc?
  const [unitBases, setUnitBases] = useState([""]);
  const [convertFrom, setConvertFrom] = useState('')
  const [convertTo, setConvertTo] = useState('')

  const distanceUnitBases=["inches","feet","meters","miles"]
  const areaUnitBases=["square meters","square feet","square miles"]
  const volumeUnitBases=["gallons","liters"]
  const temperatureUnitBases=["Fahrenheit","Celsius","Kelvin"]

 
  // useEffect(() => {
  //   console.log(newOutputValue)
  //     //used for when a dropdown item is changed. Redoes the convert without needing to update the input field

  //   const redoConvertAsync = async(numValue:number, convertTo:string, convertFrom:string, convertUnit:string) => {
  //     console.log("converting...",numValue,convertTo,convertFrom,convertUnit)
  //     let result:any = (await (invoke("convert",{ 
  //       number:numValue, 
  //       convertFrom:convertFrom, 
  //       convertTo:convertTo, 
  //       convertUnit:convertUnit 
  //   })))
  //     setNewOutputValue(result);
  //   console.log("result:",result)
  // }
  // redoConvertAsync(newOutputValue,convertTo,convertFrom,convertUnit)
  // setNeedToChangeOutputValue(false)
  // },[needToChangeOutputValue])

  if(!convertUnit){
    setConvertUnit('Distance')
    setUnitBases(distanceUnitBases)
  }
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
        
        <h1>Unit Converter: {convertUnit}</h1>
        {/* <Link to='/home' onClick={() => navigate('/home')}>home link</Link> */}
        {/* <Link to='/home1' onClick={() => navigate(1)}>Bad</Link> */}
        {/* <Link to='/' onClick={() => navigate(1)}>main</Link> */}
        {/* <UnitDropDowns unitType={unitBases}/> */}
        {/* unitBases[0] will be undefined if it isn't set yet. This way, no blank option will show up */}
        <div>
            &nbsp;Convert from &nbsp;
            <select id="convert-from" className="drop-down" onChange={(e) => {
                setConvertFrom(e.target.value);
              }}>
              <option value="Select a unit type">&lt;Select unit type&gt;</option>
              {unitBases[0] && unitBases.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            </select>
            &nbsp; to &nbsp;
            <select id="convert-to" className="drop-down" onChange={(e) => {
                setConvertTo(e.target.value);
              }}>
              <option value="Select a unit type">&lt;Select unit type&gt;</option>
              {unitBases[0] && unitBases.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            </select>
        </div>
        <br />
        {/*might need to just bring the inputandconvert stuff to the app component */}
        <InputAndConvert convertFrom={convertFrom} convertTo={convertTo} convertUnit={convertUnit} />
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
