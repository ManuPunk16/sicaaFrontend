import { NgModule } from '@angular/core';
import { ProtectedRoutingModule } from './protected-routing.module';
import {CommonModule} from "@angular/common";
import {ProtectedComponent} from "./protected.component";
import { LoadingComponent } from './shared/loading/loading.component';
import { MenuComponent } from './shared/menu/menu.component';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
    declarations: [
        ProtectedComponent,
        LoadingComponent,
        MenuComponent
    ],
    imports: [
        ProtectedRoutingModule,
        CommonModule,
        TooltipModule
    ],
    providers: [],
    exports: [
        LoadingComponent
    ]
})
export class ProtectedModule { }
