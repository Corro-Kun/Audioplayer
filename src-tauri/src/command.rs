use tauri::api::dir::DiskEntry;
use tauri::api::{path, dir};
use tauri::Result as TauriResult;
use rusqlite::{params, Result as SqliteResult};
use crate::models::*;
use crate::config::*;
use crate::check::*;

#[tauri::command]
pub fn get_path_music() -> Vec<DiskEntry>{
    let path = path::audio_dir().unwrap();
    let list_music = dir::read_dir(path,false).unwrap();
    list_music
}

#[tauri::command]
pub fn get_path_video() -> Vec<DiskEntry>{
    let path = path::video_dir().unwrap();
    let list_video = dir::read_dir(path,true).unwrap();
    list_video
}

#[tauri::command]
pub fn put_path_video(path: &str) -> TauriResult<String> {
    if let Err(err) = update_video(path){
        println!("Error: {}", err)
    }
    Ok("ok".to_string())
}

fn update_video(path: &str) -> SqliteResult<()> {
    let conn = connect();

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
pub fn get_video_db() -> String {
    let mut conn = connect();

    check_table_video(&mut conn);

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

#[tauri::command]
pub fn get_color_db() -> Vec<Color>{
    let mut conn = connect();

    check_table_color(&mut conn);
    
    let mut stmt = conn.prepare("SELECT * FROM color;").map_err(|err| format!("the error is {}", err.to_string())).expect("error");

    let config = stmt.query_map([], |row|{
        Ok(Color{
            id: row.get(0)?,
            name: row.get(1)?,
            color: row.get(2)?
        })
    }).expect("error");

    let mut config_list = Vec::new();

    for conf in config {
        let config = conf.expect("error");
        config_list.push(config);
    }

    config_list
}

#[tauri::command]
pub fn save_color_db(colors: Vec<Color>) {
    let conn = connect();

    for color in colors{
        let _ = conn.execute(
            "UPDATE color SET color = ?1 WHERE id = ?2",
            params![color.color, color.id],
        ).expect("error");
    }
}

#[tauri::command]
pub fn get_config_db() -> Vec<Config>{
    let mut conn = connect();

    check_table_config(&mut conn);

    let mut stmt = conn.prepare("SELECT * FROM config;").map_err(|err| format!("the error is {}", err.to_string())).expect("error");

    let config = stmt.query_map([], |row|{
        Ok(Config{
            id: row.get(0)?,
            name: row.get(1)?,
            value: row.get(2)?
        })
    }).expect("error");

    let mut config_list = Vec::new();

    for conf in config {
        let config = conf.expect("error");
        config_list.push(config);
    }

    config_list
}

#[tauri::command]
pub fn save_config_db(configs: Vec<Config>) {
    let conn = connect();

    for config in configs{
        let _ = conn.execute(
            "UPDATE config SET value = ?1 WHERE id = ?2",
            params![config.value, config.id],
        ).expect("error");
    }
}

#[tauri::command]
pub fn get_color_text() -> String{
    let mut conn = connect();

    check_table_color(&mut conn);

    let mut stmt = conn.prepare("SELECT color FROM color WHERE name = '--Text_Color';").map_err(|err| format!("the error is {}", err.to_string())).expect("error");

    let color = stmt.query_map([], |row|{
        Ok(row.get(0)?)
    }).expect("error");

    let mut color_text = String::new();

    for col in color {
        color_text = col.expect("error");
    }

    color_text
}

#[tauri::command]
pub fn get_color_background() -> String{
    let mut conn = connect();

    check_table_color(&mut conn);

    let mut stmt = conn.prepare("SELECT color FROM color WHERE name = '--Background_Color';").map_err(|err| format!("the error is {}", err.to_string())).expect("error");

    let color = stmt.query_map([], |row|{
        Ok(row.get(0)?)
    }).expect("error");

    let mut color_background = String::new();

    for col in color {
        color_background = col.expect("error");
    }

    color_background
}