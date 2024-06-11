import { TrackService } from '@modules/tracks/services/track.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {

  usuario: any = {}
  listObservers$: Array<Subscription> = []
  isLoads: boolean = false;
  clientes:string = ''
  servicios:string = ''
  archivador:string = ''

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('Usuario');
    this.usuario = JSON.parse(this.usuario)
    this.getData()
  }


  getData() {
    this.isLoads = true;
    this.trackService.list()
      .subscribe(
        res => {
          let data: any = res;
          this.clientes = data.clientes;
          this.servicios = data.servicios;
          this.archivador = data.archivador;
          this.isLoads = false;
        },
      )
  }

}
