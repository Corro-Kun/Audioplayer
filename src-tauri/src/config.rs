use rusqlite::{Connection, params};

pub fn connect() -> Connection{
    let conn = Connection::open("database.db").unwrap();

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

    conn
}