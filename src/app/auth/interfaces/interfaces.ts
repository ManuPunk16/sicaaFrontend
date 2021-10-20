export interface Menu{
  padre:number;
  url:string;
  icon:string;
  label:string;
}

export interface Area{
  id:string;
  icon:string;
  area:string;
  activa:boolean;
  menus: Menu[];
}

export interface AuthResponse{
  ok: boolean;
  uid: string;
  name: string;
  token: string;
  email:string;
  areas:Area[];
}

export interface Usuario{
  uid:string;
  name:string;
  email:string;
  token:string;
  areas:Area[];
}
