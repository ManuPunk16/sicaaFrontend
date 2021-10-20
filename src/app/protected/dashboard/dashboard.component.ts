import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";
import {UserService} from "../services/user.service";
import * as ui from "../../actions/ui.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Menu, Usuario} from "../../auth/interfaces/interfaces";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`*{margin: 0px;}`]
})
export class DashboardComponent implements OnInit {

  usuario:Usuario= { ...this.authService.usuario };

  constructor(private store: Store<AppState>, private router:Router, private authService:AuthService) {

    this.store.select('user').subscribe(({auth})=>{
      this.usuario = {...auth}
    });

  }

  ngOnInit(): void {



  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}
