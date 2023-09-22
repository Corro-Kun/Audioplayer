#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn greet(name: &str) -> String{
    format!("Hello, {}!", name)
}

use tauri::api::dir::DiskEntry;
use tauri::api::path;
use tauri::api::dir;

#[tauri::command]
fn get_path_music() -> Vec<DiskEntry>{
    let path = path::audio_dir().unwrap();
    let list_music = dir::read_dir(path,false).unwrap();
    list_music
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_path_music])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
