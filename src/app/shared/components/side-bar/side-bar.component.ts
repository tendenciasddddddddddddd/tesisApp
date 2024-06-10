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

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Inicio',
        icon: 'uil uil-estate',
        router: ['/', 'tracks']
      },
      {
        name: 'Clientes',
        icon: 'uil uil-users-alt',
        router: ['/', 'clientes']
      },
      {
        name: 'Servicios',
        icon: 'uil uil-chart',
        router: ['/', 'servicios'],
        query: { hola: 'mundo' }
      }
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Archivador',
        icon: 'uil-clouds',
        router: ['/', 'archivador']
      },
      {
        name: 'Finalizados',
        icon: 'uil-comment-check',
        router: ['/', 'finalizados']
      },
      {
        name: 'Caja',
        icon: 'uil-dollar-sign',
        router: ['/', 'usuari']
      },
      {
        name: 'Usuarios',
        icon: 'uil-user-plus',
        router: ['/', 'usuarios']
      }
    ]

    this.customOptions = [
      {
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
    this.router.navigate(['/', 'auth'])
    this.cookieService.delete('token')
    localStorage.clear();
    window.location.reload()
  }
}