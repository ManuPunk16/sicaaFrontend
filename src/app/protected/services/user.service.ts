import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponse} from "../../auth/interfaces/interfaces";
import {catchError, map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {DataTablesResponse} from "../../classes/data-tables-response";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  menu(): Observable<boolean>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${ localStorage.getItem('token') }` || '');
    return this.http.get<any>(`${ this.baseUrl }/user/menu`, { headers });
  }

  usuariosDataTable(dataTablesParameters:any): Observable<DataTablesResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${ localStorage.getItem('token') }` || '');
    return this.http.post<DataTablesResponse>(`${ this.baseUrl }/user/list`,dataTablesParameters, { headers });
  }

  borrarUsuario(key:any): Observable<boolean>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${ localStorage.getItem('token') }` || '');
    return this.http.post<boolean>(`${ this.baseUrl }/user/borrar`, { key }, { headers });
  }

}
