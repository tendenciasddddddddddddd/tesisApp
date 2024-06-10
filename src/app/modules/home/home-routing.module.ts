import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () => import('@modules/tracks/tracks.module').then(m => m.TracksModule)
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
    path: 'usuarios',
    loadChildren: () => import('@modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'agencia',
    loadChildren: () => import('@modules/agencia/agencia.module').then(m => m.AgenciaModule)
  },
  {
    path: 'archivador',
    loadChildren: () => import('@modules/archivador/archivador.module').then(m => m.ArchivadorModule)
  },
  {
    path: 'finalizados',
    loadChildren: () => import('@modules/finalizados/finalizados.module').then(m => m.FinalizadosModule)
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
