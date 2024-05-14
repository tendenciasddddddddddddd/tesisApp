import { Component, OnInit } from '@angular/core';
import { ArchivaService } from '@modules/archivador/services/archiva.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-archivador-page',
  templateUrl: './archivador-page.component.html',
  styleUrls: ['./archivador-page.component.css']
})
export class ArchivadorPageComponent implements OnInit {
  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isVisible = false;
  keyId: string = '';
  cliente: string = '';
  lisDto: any = [];
  lisCliente: any = [];
  lisServices: any = [];
  validateForm: FormGroup<{
    canton: FormControl<string>;
    parroquia: FormControl<string>;
    mts: FormControl<string>;
    provincia: FormControl<string>;
    total: FormControl<string>;
    sector: FormControl<string>;
    cliente: FormControl<string>;
    servicio: FormControl<string>;
  }>;
  constructor(private arcService: ArchivaService,
    private fb: NonNullableFormBuilder, private modal: NzModalService, private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      canton: ['', [Validators.required]],
      parroquia: ['', [Validators.required]],
      mts: ['',],
      provincia: ['', [Validators.required]],
      total: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getData();
    this.getClient();
    this.getServicios()
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
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log(this.cliente);
      //this.validateForm.controls['cliente'].setValue(this.cliente);
      if (this.keyId === '') {
        this.arcService.Save(this.validateForm.value)
          .subscribe(
            res => {
              this.message.create('success', `Registro creado con exito`);
              this.isVisible = false;
              this.getData();
              this.validateForm.reset();
            })
      } else {
        this.arcService.Update(this.keyId, this.validateForm.value)
          .subscribe(
            res => {
              this.message.create('success', `Registro editado con exito`);
              this.isVisible = false;
              this.getData();
              this.validateForm.reset();
            })
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  showDeleteConfirm(key: string): void {
    console.log(key);
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar?',
      nzContent: '<b style="color: red;">Esta acción no se puede deshacer</b>',
      nzOkText: 'Eliminar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.eliminar(key),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
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
  getClient() {
    this.arcService.listCliente()
      .subscribe(
        res => {
          let data: any = res;
          this.lisCliente = data;
        },
      )
  }
  getServicios() {
    this.arcService.listServicio()
      .subscribe(
        res => {
          let data: any = res;
          this.lisServices = data;
        },
      )
  }
  eliminar(key: string) {
    this.arcService.Remove(key)
      .subscribe(res => {
        this.message.create('success', `Registro eliminado con exito`);
        this.getData();
      })
  }
  update(data: any) {
    console.log(data.cliente);
    this.keyId = data._id;
    this.validateForm.controls['mts'].setValue(data.mts);
    this.validateForm.controls['parroquia'].setValue(data.parroquia);
    this.validateForm.controls['provincia'].setValue(data.provincia);
    this.validateForm.controls['canton'].setValue(data.canton);
    this.validateForm.controls['total'].setValue(data.total);
    this.validateForm.controls['sector'].setValue(data.sector);
    this.validateForm.controls['servicio'].setValue(data.servicio);
    this.validateForm.controls['cliente'].setValue(data.cliente);
    this.isVisible = true;
    console.log(this.validateForm.controls);
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
}
