import { Component, OnInit } from '@angular/core';
import { CajaService } from '@modules/caja/services/caja.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-caja-page',
  templateUrl: './caja-page.component.html',
  styleUrls: ['./caja-page.component.css']
})
export class CajaPageComponent implements OnInit {
  listOfControl: Array<{ id: number; text: string; monto: string; }> = [];
  listOfGastos: Array<{ id: number; text: string; monto: string; }> = [];
  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isLoads2: boolean = false;
  estadoCaja: boolean = false;
  isVisibleComprobante: boolean = false;
  tabs = [1, 2, 3];
  usuario: any = {}
  isVisible = false;
  keyId: string = '';
  total: string = '';
  rowDto: any = [];
  rowDtoHistory: any = [];
  facturaHtml: any = {};
  validateForm: FormGroup<{
    cajaInicial: FormControl<number>;
    estado: FormControl<boolean>;
  }>;
  constructor(private servService: CajaService,
    private fb: NonNullableFormBuilder, private modal: NzModalService, private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      cajaInicial: [0, [Validators.required]],
      estado: [true],
    });
  }
  ngOnInit(): void {
    this.getData();
    this.getDataHistory()
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoads = true;
      this.isVisible = false;
      this.servService.Save(this.validateForm.value)
        .subscribe(
          res => {
            this.message.create('success', `Registro creado con exito`);
            this.isLoads = false;
            this.getData();
            this.validateForm.reset();
          })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar?',
      nzContent: '<b style="color: red;">Esta acción no se puede deshacer</b>',
      nzOkText: 'Eliminar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.eliminar(),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  getData() {
    try {
      this.isLoads = true;
      this.servService.list()
        .subscribe(
          res => {
            let data: any = res;
            if (data === null) {
              this.estadoCaja = false;
            } else {
              this.estadoCaja = true;
              this.rowDto = data?.caja
              this.total = data?.total;
              this.listOfControl = data?.caja?.ingresos
              this.listOfGastos = data?.caja?.gastos
            }
            this.isLoads = false;
          },
        )
    } catch (error) {
      this.isLoads = false;
    }
  }
  getDataHistory() {
    try {
      this.servService.listHistorial()
        .subscribe(
          res => {
            let data: any = res;
            this.rowDtoHistory = data
            this.isLoads = false;
          },
        )
    } catch (error) {
    }
  }
  eliminar() {
    this.isLoads = true;
    this.servService.Remove(this.rowDto._id)
      .subscribe(res => {
        this.message.create('success', `Registro eliminado con exito`);
        this.isLoads = false;
        this.getData();
      })
  }
  showModal(): void {
    this.keyId = ''
    this.validateForm.reset();
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  /*Para ingresos */
  addField(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      text: '',
      monto: '',
    };
    this.listOfControl.push(control);
  }
  removeField(i: { id: number; text: string; monto: string }, e: MouseEvent): void {
    if(i.id === 1000) {
      this.message.create('error', `No se puede eliminar ABONOS SERVICIOS`);
      return
    }
    e.preventDefault();
    const index = this.listOfControl.indexOf(i);
    this.listOfControl.splice(index, 1);
  }
  saveIngresos() {
    try {
      this.isLoads = true;
      const arrIngresos: any[] = [];
      for (let i = 0; i < this.listOfControl.length; i++) {
        const { id, monto, text } = this.listOfControl[i];
        if (text === '') continue
        let costo = Number(monto)
        if (monto === '') continue
        if (typeof costo != 'number') continue
        if (costo === 0) continue
        if (id == 1000) continue
        arrIngresos.push({
          id,
          monto,
          text
        })
      }
      const model = {
        ingresos: arrIngresos
      }
      this.servService.Update(this.rowDto._id, model)
        .subscribe(
          res => {
            this.message.create('success', `Ingresos creado con exito`);
            this.isLoads = false;
            this.getData();
            this.validateForm.reset();
          })
    } catch (error) {
      this.isLoads = false;
    }

  }
  /*Para ingresos */
  addFieldGastos(e?: MouseEvent): void {

    e?.preventDefault();
    const id = this.listOfGastos.length > 0 ? this.listOfGastos[this.listOfGastos.length - 1].id + 1 : 0;
    const control = {
      id,
      text: '',
      monto: '',
    };
    this.listOfGastos.push(control);
  }
  removeFieldGasto(i: { id: number; text: string; monto: string }, e: MouseEvent): void {
    e.preventDefault();
    const index = this.listOfGastos.indexOf(i);
    this.listOfGastos.splice(index, 1);
  }
  saveGastos() {
    try {
      this.isLoads = true;
      const arrIngresos: any[] = [];
      for (let i = 0; i < this.listOfGastos.length; i++) {
        const { id, monto, text } = this.listOfGastos[i];
        if (text === '') continue
        let costo = Number(monto)
        if (monto === '') continue
        if (typeof costo != 'number') continue
        if (costo === 0) continue
        arrIngresos.push({
          id,
          monto,
          text
        })
      }
      const model = {
        gastos: arrIngresos
      }
      this.servService.Update(this.rowDto._id, model)
        .subscribe(
          res => {
            this.message.create('success', `Gastos creado con exito`);
            this.isLoads = false;
            this.getData();
            this.validateForm.reset();
          })
    } catch (error) {
      this.isLoads = false;
    }
  }

  /*Cerrar caja */
  showCerrarcajaConfirm(): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de cerrar caja?',
      nzContent: '<b style="color: red;">Esta acción no se puede deshacer</b>',
      nzOkText: 'Cerrar Caja',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () => this.cerrarCaja(),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  cerrarCaja() {
    try {
      this.usuario = localStorage.getItem('Usuario');
      this.usuario = JSON.parse(this.usuario)
      const model = {
        total: this.total,
        cajaInicial: this.rowDto?.cajaInicial,
        responsable: this.usuario?.nombre
      }
      this.servService.CerrarCaja(this.rowDto._id, model)
        .subscribe(
          res => {
            this.message.create('success', `Gastos creado con exito`);
            this.isLoads = false;
            this.getData();
            this.getDataHistory()
            this.validateForm.reset();
          })
    } catch (error) {
      console.log(error);
    }
  }

  closeComprobante() {
    this.isVisibleComprobante = false;
  }
  openComprobante(): void {
    //this.rowService = data
    this.getComprobante()
    this.isVisibleComprobante = true;
  }
  printHistorial(data: any): void {
    this.getComprobanteHistoria(data)
    this.isVisibleComprobante = true;
  }
  getComprobanteHistoria(data: any) {
    this.isLoads2 = true;
    this.usuario = localStorage.getItem('Usuario');
    this.usuario = JSON.parse(this.usuario)
    let user = this.usuario?.nombre
    this.servService.ComprobanteHistorial(user, this.total, data)
      .subscribe(
        res => {
          let data: any = res;
          this.facturaHtml = data
          this.isLoads2 = false;
        },
      )
  }
  getComprobante() {
    this.isLoads = true;
    this.usuario = localStorage.getItem('Usuario');
    this.usuario = JSON.parse(this.usuario)
    let user = this.usuario?.nombre
    this.servService.Comprobante(user, this.total)
      .subscribe(
        res => {
          let data: any = res;
          this.facturaHtml = data
          this.isLoads = false;
        },
      )
  }
  builfPdf (){
   this.isLoads = true;
   const box = document.getElementById('box')!.innerHTML;
   const model = {info : box}
    this.servService.BuildPdfCaja(model)
      .subscribe(
        res => {
          let data: any = res;
            let a = document.createElement('a');
            a.target = '_blank';
            a.href = data
            a.click();
            this.isLoads = false;
        },
      )
  }
  numericOnly(event: any): boolean {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
}
textOnly(event: any): boolean {    
  let patt = /^[a-zA-Z ]*$/;
  let result = patt.test(event.key);
  return result;
}
}
