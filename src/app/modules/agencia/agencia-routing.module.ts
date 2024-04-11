import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenciaPageComponent } from './pages/agencia-page/agencia-page.component';

const routes: Routes = [
  {
    path: '',
    component: AgenciaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenciaRoutingModule { }
