#[derive(Debug)]
pub struct Video{
    pub path: String
}

#[derive(Debug)]
pub struct Config{
    pub id: i32,
    pub name: String,
    pub color: String,
    pub size: String
}

impl Config{
    pub fn new(id: i32, name: String, color: String, size: String) -> Config{
        Config{
            id,
            name,
            color,
            size
        }
    }

    pub fn default() -> Vec<Config>{
        vec![
            Config::new(1, "word".to_string(), "#fff".to_string(), "no".to_string()),
            Config::new(2, "border".to_string(), "#000".to_string(), "2px".to_string()),
            Config::new(3, "shader".to_string(), "#000000".to_string(), "20px".to_string())
        ]
    }
}