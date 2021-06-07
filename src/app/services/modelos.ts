export interface Setores{ // filter for: nome, ativo, data
    "id": string,
    "entidade_id": string,
    "chave_escolha": number,
    "nome": string,
    "email": string,
    "ativo": Boolean,
    "created_at": string,
    "updated_at": string
    
}
export interface User { // filter for: name, admin, data, num of sectors
    "id": string,
    "name": string,
    "email": string,
    "avatar": string,
    "admin": boolean,
    "created_at": string,
    "updated_at": string,
    "setores": [Setores],
    "avatar_url": string
  }
export interface DialogData{
    type: string,
    id: string,
    data: string
}
