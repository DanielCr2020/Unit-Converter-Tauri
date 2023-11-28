import { createSignal } from "solid-js";
// import Home from './components/Home'
// import NotFound from './components/NotFound'
// import InputAndConvert from "./components/InputAndConvert";
// import { Routes, Route, Router } from "@solidjs/router";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [convertUnit, setConvertUnit] = createSignal("Distance");   //is it distance, volume, area, etc?
  const [unitBases, setUnitBases] = createSignal([""]);
  const [convertFrom, setConvertFrom] = createSignal('')
  const [convertTo, setConvertTo] = createSignal('')
  const [inputValue, setInputValue] = createSignal(0.0)
  const [outputValue, setOutputValue] = createSignal(0.0)

  const distanceUnitBases=["inches","feet","miles","meters","centimeters"]
  const areaUnitBases=["square meters","square feet","square miles"]
  const volumeUnitBases=['quarts',"gallons","liters"]
  const temperatureUnitBases=["Fahrenheit","Celsius","Kelvin"]

  setConvertUnit("Distance")
  setUnitBases(distanceUnitBases)

  const handleChange = () => {   //handles input box or unit dropdown change - runs every time one of those changes
      invokeConvert(Number.parseFloat(inputValue()))
  }
  async function invokeConvert(numValue) {
      setOutputValue(await invoke("convert",{ 
          number:numValue, 
          convertFrom:convertFrom(), 
          convertTo:convertTo(), 
          convertUnit:convertUnit() 
      }));
  }

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
        
        <h1>{convertUnit()} Converter </h1>
        {/* unitBases[0] will be undefined if it isn't set yet. This way, no blank option will show up */}
        <div>
            &nbsp;Convert from &nbsp;
            <select id="convert-from" className="drop-down" onChange={(e) => {
                setConvertFrom(e.target.value);
                handleChange()
              }}>
              <option value="Select a unit type">&lt;Select unit type&gt;</option>
              {/* Populate the dropdown menus */}
              {unitBases()[0] && unitBases().map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            </select>
            &nbsp; to &nbsp;
            <select id="convert-to" className="drop-down" onChange={(e) => {
                setConvertTo(e.target.value);
                handleChange()
              }}>
              <option value="Select a unit type">&lt;Select unit type&gt;</option>
              {unitBases()[0] && unitBases().map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            </select>
        </div>
        <br />
        <div className="conversion-div">
            <input 
                id="main-input" 
                name='inputValue'
                type='text'
                autoComplete='off'
                placeholder="Enter a number..."   //redo convert each time the input changes
                onInput={(e) => {setInputValue(e.target.value); handleChange()}}
            />  
            <h2>{outputValue()}</h2>
        </div>
        {/* <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<br />} />
          <Route path='*' element={<NotFound />} />
        </Routes> */}
      </div>
      {/* The forbidden zone */}
    </div>
  );
}

export default App;
