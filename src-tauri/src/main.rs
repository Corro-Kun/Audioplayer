#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn greet(name: &str) -> String{
    format!("Hello, {}!", name)
}

mod command;
mod models;
mod config;
mod check;

use command::*;

extern crate rusqlite;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_path_music, get_path_video, put_path_video, get_video_db, get_color_db, save_color_db, get_config_db, save_config_db, get_color_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
