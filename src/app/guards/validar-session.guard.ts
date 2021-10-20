import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as auth from "../actions/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class ValidarSessionGuard implements CanActivate, CanLoad {

  constructor(private router:Router, private store:Store<AppState>) {
  }

  canActivate(): Observable<boolean> | boolean{
    if(localStorage.getItem('token')){
      //this.router.navigateByUrl('/app/dashboard');
      return false;
    }
    return false;
  }

  canLoad(): Observable<boolean> | boolean {
    if(localStorage.getItem('token')){
      //this.router.navigateByUrl('/app/dashboard');
      return false;
    }
    return false;
  }
}
