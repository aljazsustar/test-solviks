import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {JwtInterceptor} from "./interceptors/jwt";
import {ErrorInterceptor} from "./interceptors/ErrorInterceptor";
import {appRoutingModule} from "./app-routing.module";
import { LogsComponent } from './logs/logs.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule,
        FontAwesomeModule
    ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogsComponent,
    RegisterComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
