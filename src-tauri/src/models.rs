use serde::{Serialize, Deserialize};

#[derive(Debug)]
pub struct Video{
    pub path: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Color{
    pub id: i32,
    pub name: String,
    pub color: String,
}

impl Color{
    pub fn new(id: i32, name: String, color: String) -> Color{
        Color{
            id,
            name,
            color,
        }
    }

    pub fn default() -> Vec<Color>{
        vec![
            Color::new(1, "--Text_Color".to_string(), "#fff".to_string()),
            Color::new(2, "--Border_Color".to_string(), "#000".to_string()),
            Color::new(3, "--Shadow_Color".to_string(), "#000000".to_string())
        ]
    }
}