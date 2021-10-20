import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pagina2RoutingModule } from './pagina2-routing.module';
import { Pagina2Component } from './pagina2.component';


@NgModule({
  declarations: [
    Pagina2Component
  ],
  imports: [
    CommonModule,
    Pagina2RoutingModule
  ]
})
export class Pagina2Module { }
