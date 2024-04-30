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
            Color::new(2, "--Border_Color".to_string(), "#f48623".to_string()),
            Color::new(3, "--Shadow_Color".to_string(), "#ee7c11".to_string()),
            Color::new(4, "--Background_Color".to_string(), "#f29945".to_string()),
        ]
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Config{
    pub id: i32,
    pub name: String,
    pub value: String
}

impl Config{
    pub fn new(id: i32, name: String, value: String) -> Config{
        Config{
            id,
            name,
            value,
        }
    }

    pub fn default() -> Vec<Config>{
        vec![
            Config::new(1, "--Blur_Px".to_string(), "0px".to_string()),
            Config::new(2, "--Shadow_Px".to_string(), "15px".to_string()),
            Config::new(3, "--Border_Radio_Px_Primary".to_string(), "15px".to_string())
        ]
    }
}