import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciaRoutingModule } from './agencia-routing.module';
import { AgenciaPageComponent } from './pages/agencia-page/agencia-page.component';


@NgModule({
  declarations: [
    AgenciaPageComponent
  ],
  imports: [
    CommonModule,
    AgenciaRoutingModule
  ]
})
export class AgenciaModule { }
