import { Component, OnInit } from '@angular/core';
import { FinalService } from '@modules/finalizados/services/final.service';
import { Observable, of } from 'rxjs';

interface ItemData {
  _id: string;
  fecha: string;
  departamento: string;
  asunto: string;
  responsable: {
    nombre: string;
    cedula: string;
  };
  archivos: [{
    link: string;
    tipo: string;
    size: string;
    name: string;
    formato: string;
  }];
  nombreDoc: string;
  estadoTramite: string;
}

@Component({
  selector: 'app-finalizado-page',
  templateUrl: './finalizado-page.component.html',
  styleUrls: ['./finalizado-page.component.css']
})
export class FinalizadoPageComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isLoad: boolean = false;
  isVisible = false;
  isVisibleArchivador = false;
  isVisiblePagos = false;
  isVisibleComprobante = false;
  rowService: any = {};
  lisDto: any = [];
  rowRequirimiento: any = [];
  listOfPagos: any = [];
  departamento: string = '';
  tipo: string = '';
  monto: string = '';
  totalAbonos: number = 0;
  porcAbonos: number = 0;
  facturaHtml: any = {};
  constructor(private arcService: FinalService) {
  }

  ngOnInit(): void {
    this.getData();
  }
  copylistOfData = [...this.lisDto];
  search(search: any) {
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(search)) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.lisDto = targetValue;
  }
  getData() {
    this.isLoads = true;
    this.arcService.list()
      .subscribe(
        res => {
          let data: any = res;
          this.lisDto = data;
          this.copylistOfData = [...data];
          this.isLoads = false;
        },
      )
  }
  getDataById(id: string) {
    this.isLoad = true;
    this.arcService.getById(id)
      .subscribe(
        res => {
          let data: any = res;
          this.listOfData = [...data.arrRequisitos];
          this.updateEditCache();
          this.isLoad = false;

        },
      )
  }

  /*Matrix de archivos */
  showModalArchiva(data: any): void {
    this.rowService = data
    this.getDataById(this.rowService?._id)
    this.isVisibleArchivador = true;
  }
  handleArchiCancel(): void {
    this.isVisibleArchivador = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item._id] = {
        edit: false,
        data: { ...item }
      };
    });
  }
  /* ------- Pagos ------ */
  getDataByIdPagos(id: string) {
    this.isLoad = true;
    this.totalAbonos = 0
    this.porcAbonos = 0
    this.arcService.getById(id)
      .subscribe(
        res => {
          let data: any = res;
          this.listOfPagos = [...data.pagos];
          this.isLoad = false;
          for (let i = 0; i < this.listOfPagos.length; i++) {
            const element = this.listOfPagos[i];
            this.totalAbonos = this.totalAbonos + Number(element.monto)
          }
          let porcen = (Number(this.totalAbonos) / Number(this.rowService.total)) * 100
          porcen = Math.round(porcen);
          this.porcAbonos = porcen
        },
      )
  }
  openPagos(data: any): void {
    this.rowService = data
    this.getDataByIdPagos(this.rowService?._id)
    this.isVisiblePagos = true;
  }
  closePagos(): void {
    this.isVisiblePagos = false;
  }


  /*Imprimir comprobante */
  openComprobante(data: any): void {
    this.rowService = data
    this.getComprobante(this.rowService)
    this.isVisibleComprobante = true;
  }
  closeComprobante(): void {
    this.isVisibleComprobante = false;
  }

  getComprobante(data: string) {
    this.isLoad = true;
    this.arcService.Comprobante(data)
      .subscribe(
        res => {
          let data: any = res;
          this.facturaHtml = data
          this.isLoad = false;
        },
      )
  }
  builfPdf() {
    try {
      this.isLoad = true;
      this.arcService.builfPdf(this.rowService)
        .subscribe(
          res => {
            let data: any = res;
            let a = document.createElement('a');
            a.target = '_blank';
            a.href = data
            a.click();;
            this.isLoad = false;
          },
        )
    } catch (error) {
      this.isLoad = false;
    }
  }
}
