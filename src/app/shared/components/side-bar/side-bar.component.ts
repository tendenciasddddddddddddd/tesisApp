import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<any> = []
  usuario: any = {}
  roles: any = []
  rolAdmin: boolean = false;
  rolTramitador: boolean = false;
  rolSecretaria: boolean = false;

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
   
    this.usuario = localStorage.getItem('Usuario');
    this.usuario = JSON.parse(this.usuario)
    this.roles = this.usuario?.role;
    if(this.roles.includes('Admin'))this.rolAdmin = true;
    if(this.roles.includes('Tramitador'))this.rolTramitador = true;
    if(this.roles.includes('Secretaria'))this.rolSecretaria = true;
    this.mainMenu.defaultOptions = [
      {
        estado : this.rolAdmin || this.rolTramitador || this.rolSecretaria,
        name: 'Inicio',
        icon: 'uil uil-estate',
        router: ['/', 'tracks']
      },
      {
        estado : this.rolAdmin || this.rolTramitador,// || this.rolSecretaria,
        name: 'Clientes',
        icon: 'uil uil-users-alt',
        router: ['/', 'clientes']
      },
      {
        estado : this.rolAdmin || this.rolTramitador ,
        name: 'Servicios',
        icon: 'uil-server-connection',
        router: ['/', 'servicios'],
        query: { hola: 'mundo' }
      }
    ]

    this.mainMenu.accessLink = [
      {
        estado : this.rolAdmin || this.rolTramitador || this.rolSecretaria,
        name: 'Archivador',
        icon: 'uil-folder-lock',
        router: ['/', 'archivador']
      },
      {
        estado : this.rolAdmin || this.rolTramitador || this.rolSecretaria,
        name: 'Finalizados',
        icon: 'uil-history',
        router: ['/', 'finalizados']
      },
      {
        estado : this.rolAdmin || this.rolSecretaria,
        name: 'Caja',
        icon: 'uil-file-medical-alt',
        router: ['/', 'caja']
      },
      {
        estado : this.rolAdmin,
        name: 'Usuarios',
        icon: 'uil-fire',
        router: ['/', 'usuarios']
      }
    ]

    this.customOptions = [
      {
        estado : this.rolAdmin,
        icon: 'uil uil-chart',
        name: 'Agencia',
        router: ['/', 'agencia']
      },
    ]
  }

  goTo($event: any): void {
    this.router.navigate(['/', 'favorites'], {
      queryParams: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      }
    })
    console.log($event)
  }
  final(){
    this.cookieService.delete('token')
    localStorage.clear();
    window.location.reload()
  }
  toggleBodyClass() {
    const el = document.body;
    if (!el.classList.contains('sidebar-hidden')) {
      el.classList.add('sidebar-hidden');
    } else {
      el.classList.remove('sidebar-hidden');
    }
  }
  Resize () {
    let Mobile = window.innerWidth < 1200
    if (Mobile) {
      const el = document.body;
      el.classList.add('sidebar-hidden');
    }
  }
}