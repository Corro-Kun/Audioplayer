#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn greet(name: &str) -> String{
    format!("Hello, {}!", name)
}

use tauri::api::dir::DiskEntry;
use tauri::api::path;
use tauri::api::dir;
use tauri::Result as TauriResult;

#[tauri::command]
fn get_path_music() -> Vec<DiskEntry>{
    let path = path::audio_dir().unwrap();
    let list_music = dir::read_dir(path,false).unwrap();
    list_music
}

#[tauri::command]
fn get_path_video() -> Vec<DiskEntry>{
    let path = path::video_dir().unwrap();
    let list_video = dir::read_dir(path,true).unwrap();
    list_video
}

extern crate rusqlite;

use rusqlite::{Connection, params, Result as SqliteResult};
#[derive(Debug)]
struct Video {
    path: String,
}

fn update_video(path: &str) -> SqliteResult<()> {
    let conn = Connection::open("database.db")?;

    let vi = Video{
        path: path.to_string(),
    };

    let _ =conn.execute(
        "UPDATE video SET path =?1 WHERE id = 1",
        params![vi.path],
    )?;

    Ok(())
}

#[tauri::command]
fn put_path_video(path: &str) -> TauriResult<String> {
    if let Err(err) = update_video(path){
        println!("Error: {}", err)
    }
    Ok("ok".to_string())
}

#[tauri::command]
fn get_video_db() -> String {
    let conn = Connection::open("database.db").unwrap();

    let table = "video";

    let mut value = String::new();

    let table_exists: bool = conn
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
        .and_then(|mut stmt| {
        stmt.query_row(&[table], |row| Ok(value = row.get(0)?))
        })
        .is_ok();

    if !table_exists {
        let _ = conn.execute(
            "CREATE TABLE video (
                id INTEGER PRIMARY KEY,
                path TEXT NOT NULL
            )",
            [],
        );
        
        let _ = conn.execute(
            "INSERT INTO video (path) VALUES (?1)",
            params!["no"],
        );
    };

    let mut stmt = conn.prepare("SELECT * FROM video;").map_err(|err| format!("the error is {}", err.to_string())).unwrap();

    let video = stmt.query_map([], |row|{
        Ok(Video{
            path: row.get(1)?
        })
    }).unwrap();

    let mut path_video = String::new();

    for vi in video {
        let video = vi.unwrap();
        path_video = video.path;
    }

    path_video
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_path_music, get_path_video, put_path_video, get_video_db])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
