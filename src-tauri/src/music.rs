mod music{
    use tauri::api::dir::DiskEntry;
    use tauri::api::path;
    use tauri::api::dir;
    
    pub fn list_music() -> Vec<DiskEntry>{
        let path = path::audio_dir().unwrap();
        let list_music = dir::read_dir(path,false).unwrap();
        list_music
    }
}