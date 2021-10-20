import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./app.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading:boolean=false;

  constructor(private store:Store<AppState>) {
    this.store.select('ui')
      .subscribe(({isLoading}) => this.loading = isLoading);
  }

}
