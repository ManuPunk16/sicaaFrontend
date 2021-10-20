import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProtectedModule } from "./protected/protected.module";
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from "./app.reducer";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ProtectedModule,
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
