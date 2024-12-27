//This component has the input text box and the ouput text result. It imvokes the backend rust function
import '../App.css';
import { createSignal } from 'solid-js';
import { invoke } from "@tauri-apps/api/core";

const InputAndConvert = (props) => {
    const [outputValue, setOutputValue] = createSignal(0.0)

    const handleChange = (e) => {
        invokeConvert(Number.parseFloat(e.target.value))
    }
    function invokeConvert(numValue) {
        let conversion_rust=invoke("convert",{ 
            number:numValue, 
            convertFrom:props.convertFrom, 
            convertTo:props.convertTo, 
            convertUnit:props.convertUnit 
        })
        .then((conversion_result) => setOutputValue(conversion_result))
        .catch((e) => setOutputValue(e))
        // setOutputValue(invoke("convert",{ 
        //     number:numValue, 
        //     convertFrom:props.convertFrom, 
        //     convertTo:props.convertTo, 
        //     convertUnit:props.convertUnit 
        // }));
    }

    return (
        <div className="conversion-div">

            <input 
                id="main-input" 
                name='inputValue'
                type='text'
                autoComplete='off'
                placeholder="Enter a number..."
                onInput={handleChange}
            />  
            <h2>{outputValue()}</h2>
        </div>
    )
}

export default InputAndConvert