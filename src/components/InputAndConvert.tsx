//This component has the input text box and the ouput text result. It imvokes the backend rust function
import '../App.css';
import { useState } from 'react';
import { invoke } from "@tauri-apps/api/tauri";

const InputAndConvert = (props:any) => {
    const [outputValue, setOutputValue] = useState(0.0)

    const handleChange = (e:any) => {
        invokeConvert(Number.parseFloat(e.target.value))
    }
    async function invokeConvert(numValue:number) {
        setOutputValue(await invoke("convert",{ 
            number:numValue, 
            convertFrom:props.convertFrom, 
            convertTo:props.convertTo, 
            convertUnit:props.convertUnit 
        }));
    }

    return (
        <div className="conversion-div">

            <input 
                id="main-input" 
                name='inputValue'
                type='text'
                autoComplete='off'
                placeholder="Enter a number..."
                onChange={handleChange}
            />  
            {/* move the output value text so that the saved data dropdown doesn't cover it */}
            <h2>{outputValue}</h2>
        </div>
    )
}

export default InputAndConvert