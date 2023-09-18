import '../App.css';
// import { useState } from 'react';
// import { invoke } from "@tauri-apps/api/tauri";

const UnitDropDowns = (props:any) => {
    // const [outputValue, setOutputValue] = useState(0.0)

    // const handleChange = (e:any) => {
    //     invokeConvert(Number.parseFloat(e.target.value))
    // }
    // async function invokeConvert(numValue:number) {
    //     setOutputValue(await invoke("convert",{ number:numValue }));
    // }

    let selectFrom: HTMLElement | null = document.getElementById("convert-from")
    let selectTo:   HTMLElement | null = document.getElementById("convert-to")
    if(selectFrom) selectFrom.innerHTML=""
    if(selectTo) selectTo.innerHTML=""
    for(let unit of props.unitType){
        let option = document.createElement("option")
        let option1 = document.createElement("option")
        option.textContent=unit;
        option1.textContent=unit;
        selectFrom?.appendChild(option)   
        selectTo?.appendChild(option1)   
    }

    return (
        <div>
            Convert from
            <select id="convert-from" className="drop-down">
            </select>
            to
            <select id="convert-to" className="drop-down">
            </select>
            {/* <h2>{outputValue}</h2> */}
        </div>
    )
}

export default UnitDropDowns