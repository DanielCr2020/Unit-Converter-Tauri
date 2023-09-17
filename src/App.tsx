// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import Home from './components/Home'
import NotFound from './components/NotFound'
import InputComponent from "./components/InputComponent";
import {Route, Link, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router'
import "./App.css";

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  const navigate=useNavigate()

  return (
    //container holds the entire thing
    <div className="container">

      <div className="sidebar">
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            // greet();
          }}
        >
          <input
            id="greet-input"
            // onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
        <button>Distance</button>
        <button>Volume</button>
        <button>Area</button>
        <button>Temperature</button>
      </div>
      
      <div className="applet">
      {/* <p>{greetMsg}</p> */}
        
        <h1>Unit Converter</h1>
        <Link to='/home' onClick={() => navigate('/home')}>home link</Link>
        <Link to='/home1' onClick={() => navigate(1)}>Bad</Link>
        <Link to='/' onClick={() => navigate(1)}>main</Link>
        <InputComponent />

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
