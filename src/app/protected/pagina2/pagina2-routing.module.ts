import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Pagina2Component} from "./pagina2.component";

const routes: Routes = [
  {
    path:'',
    component: Pagina2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pagina2RoutingModule { }
