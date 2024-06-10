import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaPageComponent } from './pages/caja-page/caja-page.component';


@NgModule({
  declarations: [
    CajaPageComponent
  ],
  imports: [
    CommonModule,
    CajaRoutingModule
  ]
})
export class CajaModule { }
