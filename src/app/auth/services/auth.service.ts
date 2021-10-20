import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthResponse, Usuario} from "../interfaces/interfaces";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import * as ui from "../../actions/ui.actions";
import * as auth from "../../actions/auth.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";

@Injectable({ providedIn: 'root' })

export class AuthService {

  private baseUrl:string = environment.baseUrl;

  private _usuario!:Usuario;

  get usuario(){ return { ... this._usuario }; }

  constructor(private http:HttpClient, private store: Store<AppState>) { }

  login(email:string, password:string){
    this.store.dispatch( ui.isLoading() );
    return this.http.post<AuthResponse>(`${ this.baseUrl }/auth`,{ email, password })
      .pipe(
        tap( resp =>{
          if(resp.ok){
            localStorage.setItem('token', resp.token!);
            localStorage.setItem('token-init-date', new Date().getTime().toString());
            this._usuario = { name: resp.name!, uid: resp.uid!, email:resp.email!, token: resp.token!, areas: resp.areas! }
            localStorage.setItem('user', JSON.stringify(this._usuario));
            this.store.dispatch( ui.stopLoading() );
            this.store.dispatch(auth.setUser({ user: this._usuario }));
          }
        }),
        map(resp => resp.ok ),
        catchError( err => of(err.error.msg))
      );
  }

  validarToken(): Observable<boolean>{
    this.store.dispatch( ui.isLoading() );
    const tokenDate = new Date(parseInt(localStorage.getItem('token-init-date')!));
    const acualDate = new Date();
    const diferencia = Math.abs((acualDate.getTime() - tokenDate.getTime()) / 1000);
    if(diferencia > 7200){ // Si el token tiene mas de 2 horas de vida refresca
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer '+localStorage.getItem('token') || '');
      return this.http.get<AuthResponse>(`${this.baseUrl}/auth/renew`, { headers })
        .pipe(
          map(resp => {
            localStorage.setItem('token', resp.token!);
            this._usuario = { name: resp.name!, uid: resp.uid!, email:resp.email!, token: resp.token!, areas: resp.areas! }
            this.store.dispatch( ui.stopLoading() );
            this.store.dispatch(auth.setUser({ user: this._usuario }));
            return resp.ok;
          }),
          catchError(err => of(false))
        );
    }
    else{
      if(localStorage.getItem('user')){
        this._usuario = JSON.parse(localStorage.getItem('user')!);
        this.store.dispatch( auth.setUser({ user: this._usuario }) );
        this.store.dispatch( ui.stopLoading() );
        return of(true);
      }
      else{
        return of(false);
      }
    }
  }

  logout(){
    localStorage.clear();
    this.store.dispatch(auth.unSetUser());
  }

}
