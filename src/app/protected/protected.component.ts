import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as ui from "../actions/ui.actions";
import * as auth from "../actions/auth.actions";
import {Router} from "@angular/router";
import {AuthService} from "../auth/services/auth.service";
import {Area, Menu, Usuario} from "../auth/interfaces/interfaces";


@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: [
    './protected.component.scss'
  ]
})
export class ProtectedComponent implements OnInit {

  usuario: Usuario = { ...this.authService.usuario };
  menus: Menu[] = [];
  areaActiva:string='';
  constructor(private store: Store<AppState>, private router:Router, private authService:AuthService) {
    this.store.subscribe(({user})=>{
      if(user.auth){
        this.usuario = user.auth;
        user.auth.areas.map(e=>{
          if(e.activa){
            this.menus= Object.values(e.menus);
            this.areaActiva = e.area;
          }
        });
      }
    });

  }

  ngOnInit(): void {



  }

  setAreaActiva(area:Area, indice:number){
    let newAreas:Area[] = [];
    this.usuario.areas.map((a,i)=>{
      newAreas[i] = {...a, activa:((i===indice)?true:false)};
    });

    this.store.dispatch(auth.setUser({ user: { ...this.authService.usuario, areas: newAreas } }));
    localStorage.setItem('user', JSON.stringify(this.usuario));
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
