import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioPageComponent } from './pages/servicio-page/servicio-page.component';

const routes: Routes = [
  {
    path: '',
    component: ServicioPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
