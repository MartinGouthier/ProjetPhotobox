export interface Photo {
    id:number
    titre:string
    file:string
    descr:string
    format:string
    type:string
    size:string
    width:string
    height:string
    url:urlphoto
}

export interface ReponsePhoto{
    type:string
    photo:Photo
}

export interface urlphoto{
    href:string
}