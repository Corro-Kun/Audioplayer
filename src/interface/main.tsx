export interface list_video{
    name: string,
    path: string,
    children: list_video[]
}

export interface list_music{
    name: string,
    path: string,
    statue: boolean
}

export interface Color{
    id: string,
    name: string,
    color: string
}