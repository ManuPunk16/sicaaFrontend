import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProtectedComponent} from "./protected.component";
import {ValidarTokenGuard} from "../guards/validar-token.guard";

const routes: Routes = [
  {
    path:'',
    component: ProtectedComponent,
    children:[
      { path: 'dashboard', loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
        canActivate:[ ValidarTokenGuard ],
        canLoad: [ ValidarTokenGuard ]
      },
      { path: 'pagina2', loadChildren: ()=>import('./pagina2/pagina2.module').then(m=>m.Pagina2Module),
        canActivate:[ ValidarTokenGuard ],
        canLoad: [ ValidarTokenGuard ]
      },
      { path: 'config/usuarios', loadChildren: ()=>import('./config/usuarios/usuarios.module').then(m=>m.Pagina2Module),
        canActivate:[ ValidarTokenGuard ],
        canLoad: [ ValidarTokenGuard ]
      },
      { path:'**', redirectTo:'' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
