import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajaPageComponent } from './pages/caja-page/caja-page.component';

const routes: Routes = [
  {
    path: '',
    component: CajaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }
