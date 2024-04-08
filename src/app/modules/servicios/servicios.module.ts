import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServicioPageComponent } from './pages/servicio-page/servicio-page.component';


@NgModule({
  declarations: [
    ServicioPageComponent
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule
  ]
})
export class ServiciosModule { }
