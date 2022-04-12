import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagenesComponent } from './rutas/imagenes/imagenes.component';
import { HomeComponent } from './rutas/home/home.component';
import { MODULOS_PRIMENG } from './constantes/MODULOS-PRIMENG';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SERVICIOS } from './constantes/SERVICIOS';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ImagenesComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...MODULOS_PRIMENG
  ],
  providers: [
    ...SERVICIOS,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
