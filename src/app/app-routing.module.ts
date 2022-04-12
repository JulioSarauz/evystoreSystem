import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImagenesComponent } from './rutas/imagenes/imagenes.component';
import { HomeComponent } from './rutas/home/home.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },
  { 
    path: 'imagenes', 
    component: ImagenesComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
