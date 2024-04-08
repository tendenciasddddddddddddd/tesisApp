import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Inicio',
        icon: 'uil uil-estate',
        router: ['/', 'tracks']
      },
      {
        name: 'Clientes',
        icon: 'uil uil-search',
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
        icon: 'uil-plus-square',
        router: ['/', 'usuario']
      },
      {
        name: 'Caja',
        icon: 'uil-heart-medical',
        router: ['/', 'usuari']
      },
      {
        name: 'Usuarios',
        icon: 'uil-heart-medical',
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
}