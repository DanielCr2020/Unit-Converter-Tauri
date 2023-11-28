// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greated from Rust!", name)
// }

fn convert_distance(number: f64, from: &str, to: &str) -> f64 {
    let mut multiplier: f64 = match from {      //x to meters       one of input unit (LHS) is X many meters
        "meters" => 1.0,                //   (input unit) -> meters         meters -> meters = 1
        "centimeters" => 0.01,             
        "feet" => 0.3048,          
        "inches" => 0.0254,           
        "miles" => 1609.34,              
        _ => 0.0
    };
    multiplier *= match to {            //meters to y
        "meters" => 1.0,
        "centimeters" => 100.0,          
        "feet" => 1.0/0.3048,
        "inches" => 1.0/0.0254,
        "miles" => 1.0/1609.34,
        _ => 0.0
    };
    return number*multiplier;
}

fn convert_volume(number: f64, from: &str, to: &str) -> f64 {
    let mut multiplier: f64 = match from {      //x to liters
        "liters" => 1.0,     //base unit
        "gallons" => 3.785412,
        "quarts" => 0.946353,  
        _ => 0.0
    };
    multiplier *= match to {        //liters to y
        "liters" => 1.0,
        "gallons" => 1.0/3.785412,
        "quarts" => 1.0/0.946353,  
        _ => 0.0
    };
    return number*multiplier;
}

fn convert_temperature(number: f64, from: &str, to: &str) -> f64 {
    if from=="Fahrenheit" {
        if to == "Celsius" {
            return (number-32.0) * 5.0/9.0
        }
        if to == "Kelvin" {
            return 273.0 + (number-32.0) * 5.0/9.0
        }
        if to == "Fahrenheit" {
            return number
        }
        else {
            return 0.0
        }
    }
    else if from=="Celsius" {
        if to == "Fahrenheit" {
            return 32.0 + (9.0/5.0 * number)
        }
        if to == "Kelvin" {
            return 273.0 + number
        }
        if to == "Celsius" {
            return number
        }
        else {
            return 0.0
        }
    }
    else if from=="Kelvin" {
        if to=="Kelvin"{
            return number
        }
        if to=="Celsius" {
            return number - 273.0
        }
        if to=="Fahrenheit" {
            return (number-32.0) * 5.0/9.0
        }
        else {
            return 0.0
        }
    }
    return 0.0
}

#[tauri::command]
fn convert(number: f64, convert_from: &str, convert_to: &str, convert_unit: &str) -> f64 {
    if convert_from==convert_to {       //if the units are the same, no need to convert
        return number;
    }
    //convert every input to some base unit. Then convert that to the output unit
    if convert_unit=="Distance" {
        return convert_distance(number, convert_from, convert_to)
    }
    else if convert_unit=="Volume" {
        return convert_volume(number, convert_from, convert_to)
    }
    else if convert_unit=="Temperature"{
        return convert_temperature(number, convert_from, convert_to)
    }

    return 0.0;
}
//
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![convert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
