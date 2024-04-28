use rusqlite::{Connection, params};
use crate::models::*;

pub fn connect() -> Connection{
    let mut conn = Connection::open("database.db").unwrap();

    let mut value = String::new();

    let mut table_exists: bool = conn
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

    table_exists = conn
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

        default_color(&mut conn);
    }

    table_exists = conn
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

        default_config(&mut conn);  
    }

    conn
}

fn default_color (conn: &mut Connection){
    let values_examples = Color::default();

    for value in values_examples{
        let _ = conn.execute(
            "INSERT INTO color (id, name, color) VALUES (?1, ?2, ?3)",
            params![value.id, value.name, value.color],
        );
    }
}

fn default_config (conn: &mut Connection){
    let values_examples = Config::default();

    for value in values_examples{
        let _ = conn.execute(
            "INSERT INTO config (id, name, value) VALUES (?1, ?2, ?3)",
            params![value.id, value.name, value.value],
        );
    }
}