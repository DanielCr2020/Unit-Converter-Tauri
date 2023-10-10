// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greated from Rust!", name)
// }

fn convert_distance(number: f64, from: &str, to: &str) -> f64 {
    let mut multiplier: f64 = match from {      //x to feet
        "feet" => 1.0,  //base unit (probably)
        "inches" => 1.0/12.0,
        "miles" => 5280.0,
        "meters" => 12.0/3.375,
        _ => 0.0
    };
    multiplier *= match to {            //feet to y
        "feet" => 1.0,
        "inches" => 12.0,
        "miles" => 1.0/5280.0,
        "meters" => 3.375/12.0,
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

#[tauri::command]
fn convert(number: f64, convert_from: &str, convert_to: &str, convert_unit: &str) -> f64 {
    //convert every input to some base unit. Then convert that to the output unit
    if convert_unit=="Distance" {
        return convert_distance(number, convert_from, convert_to)
    }
    else if convert_unit=="Volume" {
        return convert_volume(number, convert_from, convert_to)
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
