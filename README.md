# Tauri Unit Converter

## About

This is a unit converter desktop application made with Tauri. It uses a rust backend with a SolidJS frontend.

For converting units, it converts the "from" unit to a base unit, then converts that number to the "to" unit.

Tauri is a toolkit used to build cross-platform desktop applications. It is a similar idea to Electron, but replaces the NodeJS backend with rust, and the chromium frontend with WebView.

Learn more about Tauri [here](https://tauri.app)

This is meant to be a simple Tauri application. It is not good example code for routing, deeply nested components, etc.

## Usage

When starting the app, you may select a unit type from the sidebar. The default is distance. Then, select a unit to convert to and from in the dropdown menus. Type the value into the textbox, and it will be converted on the fly and printed below the textbox. If you change one of the dropdowns, the conversion will be updated.

There may be some minor conversion errors due to the base unit conversions. For example, 1 mile is said to be about ~5279.98688 feet, when it is actually 5280 feet.

### Building

#### General

The windows executable binary can be found in the releases window of this github repository.

You will likely have to install some things for building to work.

Build instructions will vary per platform

[Here](https://tauri.app/v1/guides/building/) is the official documentation on building

You will need to install the packages before you can build. I use npm, so I run `npm install`

##### Development mode

To run the app in development mode, use `npm run tauri dev` OR `yarn tauri dev` OR `pnpm tauri dev` OR `cargo tauri dev`

Running it in development mode also allows you to open up the browser console. (This is where `console.log()` messages will appear).

##### Windows/MacOS/Linux

`npm run tauri build` OR `yarn tauri build` OR `pnpm tauri build` OR `cargo tauri build`

The executable is in `src-tauri/target/release` (at least for Windows).
