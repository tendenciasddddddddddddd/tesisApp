import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';


@NgModule({
  declarations: [
    InicioPageComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
