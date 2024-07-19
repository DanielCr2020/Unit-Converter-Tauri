// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greated from Rust!", name)
// }

use lazy_static::lazy_static;
use std::collections::HashMap;

lazy_static! {
    static ref DISTANCE_CONVERSIONS: HashMap<&'static str, HashMap<&'static str, f64>> = {
        let mut inches_to_other=HashMap::new();
        inches_to_other.insert("inches", 1.0);
        inches_to_other.insert("feet", 1.0/12.0);
        inches_to_other.insert("miles", 1.0/63360.0);
        inches_to_other.insert("meters", 0.00254);
        inches_to_other.insert("centimeters", 2.54);

        let mut feet_to_other=HashMap::new();
        feet_to_other.insert("inches", 12.0);
        feet_to_other.insert("feet", 1.0);
        feet_to_other.insert("miles", 1.0/5280.0);
        feet_to_other.insert("meters", 0.3048);
        feet_to_other.insert("centimeters", 30.48);

        let mut miles_to_other=HashMap::new();
        miles_to_other.insert("inches", 63360.0);
        miles_to_other.insert("feet", 5280.0);
        miles_to_other.insert("miles", 1.0);
        miles_to_other.insert("meters", 1609.344);
        miles_to_other.insert("centimeters", 160934.4);

        let mut meters_to_other=HashMap::new();
        meters_to_other.insert("inches", 39.37008);
        meters_to_other.insert("feet", 3.28084);
        meters_to_other.insert("miles", 1.0/1609.344);
        meters_to_other.insert("meters", 1.0);
        meters_to_other.insert("centimeters", 100.0);

        let mut centimeters_to_other=HashMap::new();
        centimeters_to_other.insert("inches", 0.3937008);
        centimeters_to_other.insert("feet", 0.0328084);
        centimeters_to_other.insert("miles", 1.0/160934.4);
        centimeters_to_other.insert("meters", 0.01);
        centimeters_to_other.insert("centimeters", 1.0);


        let mut conversions=HashMap::new();
        conversions.insert("feet",feet_to_other);
        conversions.insert("inches",inches_to_other);
        conversions.insert("miles",miles_to_other);
        conversions.insert("meters",meters_to_other);
        conversions.insert("centimeters",centimeters_to_other);

        conversions
    };
    
}

fn convert_distance(number: f64, from: &str, to: &str) -> f64 {
    let from_ref_opt: Option<&HashMap<&str, f64>>=DISTANCE_CONVERSIONS.get(from);
    let from_ref=match from_ref_opt {
        Some(map) => map,
        None => return 0.0,
    };
    let to_ref_opt=from_ref.get(to);
    let to_ref=match to_ref_opt {
        Some(value) => value,
        None => return 0.0,
    };
    
    return number*to_ref;
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
        return number
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
