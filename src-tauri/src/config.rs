use rusqlite::{Connection, params};
use crate::models::*;

pub fn connect() -> Connection{
    let conn = Connection::open("database.db").unwrap();

    conn
}

pub fn default_color (conn: &mut Connection){
    let values_examples = Color::default();

    for value in values_examples{
        let _ = conn.execute(
            "INSERT INTO color (id, name, color) VALUES (?1, ?2, ?3)",
            params![value.id, value.name, value.color],
        );
    }
}

pub fn default_config (conn: &mut Connection){
    let values_examples = Config::default();

    for value in values_examples{
        let _ = conn.execute(
            "INSERT INTO config (id, name, value) VALUES (?1, ?2, ?3)",
            params![value.id, value.name, value.value],
        );
    }
}