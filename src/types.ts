export interface photo {
    id:number
    titre:string
    file:string
    descr:string
    format:string
    type:string
    size:string
    width:string
    height:string
}

export interface reponsePhoto{
    type:string
    photo:photo
}