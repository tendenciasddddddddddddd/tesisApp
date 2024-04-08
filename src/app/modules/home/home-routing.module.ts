import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () => import('@modules/tracks/tracks.module').then(m => m.TracksModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('@modules/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('@modules/clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('@modules/servicios/servicios.module').then(m => m.ServiciosModule)
  },
  {
    path: '**',//TODO 404 cuando no existe la ruta
    redirectTo: '/tracks'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
