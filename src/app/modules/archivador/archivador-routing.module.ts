import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivadorPageComponent } from './pages/archivador-page/archivador-page.component';

const routes: Routes = [
  {
    path: '',
    component: ArchivadorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivadorRoutingModule { }
