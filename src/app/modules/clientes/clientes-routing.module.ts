import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClientePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
