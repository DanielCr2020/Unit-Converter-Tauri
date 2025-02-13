import { createSignal } from "solid-js";
// import Home from './components/Home'
// import NotFound from './components/NotFound'
// import InputAndConvert from "./components/InputAndConvert";
// import { Routes, Route, Router } from "@solidjs/router";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [convertUnit, setConvertUnit] = createSignal("Distance");   //is it distance, volume, area, etc?
  const [unitBases, setUnitBases] = createSignal([""]);

  const [inputValue, setInputValue] = createSignal(0.0)
  const [outputValue, setOutputValue] = createSignal(0.0)

  const distanceUnitBases=["inches","feet","miles","meters","centimeters"]
  const areaUnitBases=["square meters","square feet","square miles"]
  const volumeUnitBases=['quarts',"gallons","liters"]
  const temperatureUnitBases=["Fahrenheit","Celsius","Kelvin"]

  setConvertUnit("Distance")
  setUnitBases(distanceUnitBases)

  const [convertFrom, setConvertFrom] = createSignal('')
  const [convertTo, setConvertTo] = createSignal('')

  const handleChange = () => {   //handles input box or unit dropdown change - runs every time one of those changes
    
    let num=Number.parseFloat(inputValue())
    if(isNaN(num)){
      num=0;
    }
    invokeConvert(num);
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
        <div>
          &nbsp;Convert from &nbsp;
            <select id="convert-from" className="drop-down" value={convertFrom()} onChange={(e) => {
                setConvertFrom(e.currentTarget.value);
                handleChange()
              }}>
              {/* Populate the dropdown menus */}
                <For each={unitBases()}>
                  {(unit, index) => {
                      return <option value={unit}>{unit}</option>
                    }
                  }
                </For>
            </select>
            &nbsp; to &nbsp;
            <select id="convert-to" className="drop-down" value={convertTo()} onChange={(e) => {
                setConvertTo(e.currentTarget.value);
                handleChange()
              }}>
                <For each={unitBases()}>
                  {(unit, index) => {
                      return <option value={unit}>{unit}</option>
                    }
                  }
                </For>
            </select>
            &nbsp;
            {/* button to swap convert to and from */}
            <button className="narrow-button"
              onClick={(e) => {
                let from=convertFrom()
                let to=convertTo()
                setConvertFrom(to)
                setConvertTo(from)
                handleChange()
                console.log(convertFrom(), convertTo())
              }}>
              Swap
            </button>
        </div>
        <br />

        <div className="conversion-div">
            <input 
                id="main-input" 
                name='inputValue'
                type='text'
                autoComplete='off'
                placeholder="Enter a number..."
                onInput={(e) => {setInputValue(e.currentTarget.value); handleChange()}}
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
