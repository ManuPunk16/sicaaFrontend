import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.reducer";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  name:string='';

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('user').subscribe(({ auth })=>{
      if(auth) {
        this.name = auth.name;
      }
      else{
        this.name = '';
      }
    });
  }

}
