use rusqlite::{params, Connection};
use crate::config::{default_color, default_config};

pub fn check_table_config(conn: &mut Connection){
    let mut value = String::new();

    let table_exists = conn
        .prepare("SELECT name From sqlite_master WHERE type='table' AND name=?")
        .and_then(|mut stmt|{
            stmt.query_row(&["config"], |row| Ok(value = row.get(0)?))
        })
        .is_ok();

    if !table_exists {
        let _ = conn.execute(
            "CREATE TABLE config (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                value TEXT NOT NULL
            )",
            [],
        );

        default_config(conn);  
    }
}

pub fn check_table_color(conn: &mut Connection){
    let mut value = String::new();

    let table_exists = conn
        .prepare("SELECT name From sqlite_master WHERE type='table' AND name=?")
        .and_then(|mut stmt|{
            stmt.query_row(&["color"], |row| Ok(value = row.get(0)?))
        })
        .is_ok();

    if !table_exists {
        let _ = conn.execute(
            "CREATE TABLE color (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                color TEXT NOT NULL
            )",
            [],
        );

        default_color(conn);
    }
}

pub fn check_table_video(conn: &mut Connection){
    let mut value = String::new();

    let table_exists: bool = conn
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
        .and_then(|mut stmt| {
        stmt.query_row(&["video"], |row| Ok(value = row.get(0)?))
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

}