import '../App.css';
import { useState } from 'react';
import { invoke } from "@tauri-apps/api/tauri";

const InputComponent = () => {
    const [outputValue, setOutputValue] = useState(0.0)

    const handleChange = (e:any) => {
        invokeConvert(Number.parseFloat(e.target.value))
    }
    async function invokeConvert(numValue:number) {
        setOutputValue(await invoke("convert",{ number:numValue }));
    }

    return (
        <div>
            <input 
                id="main-input" 
                name='inputValue'
                type='text'
                placeholder="Enter a number..."
                onChange={handleChange}
            />
            <h2>{outputValue}</h2>
        </div>
    )
}

export default InputComponent