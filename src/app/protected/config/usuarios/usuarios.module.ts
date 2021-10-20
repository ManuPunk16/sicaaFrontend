import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    DataTablesModule
  ]
})
export class Pagina2Module { }
