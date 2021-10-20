import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/services/auth.service";
import {tap} from "rxjs/operators";
import * as auth from "../actions/auth.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private store:Store<AppState>, private authService:AuthService, private router:Router) {
  }

  canActivate(): Observable<boolean> | boolean{
    return this.authService.validarToken()
      .pipe(
        tap(valid=>{
          if(!valid){
            this.store.dispatch(auth.unSetUser());
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap(valid=>{
          if(!valid){
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }
}
