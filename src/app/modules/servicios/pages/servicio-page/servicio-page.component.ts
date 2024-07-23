import { Component, OnInit } from '@angular/core';
import { ServServiceService } from '@modules/servicios/services/serv-service.service';
import { Observable, of } from 'rxjs';
import {FormControl,  FormGroup,  NonNullableFormBuilder,  Validators} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-servicio-page',
  templateUrl: './servicio-page.component.html',
  styleUrls: ['./servicio-page.component.css']
})
export class ServicioPageComponent implements OnInit {
  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isVisible = false;
  keyId: string ='';
  listDto: any = [];
  validateForm: FormGroup<{
    nombre: FormControl<string>;
    estado: FormControl<boolean>;
  }>;
  constructor(private servService: ServServiceService,
    private fb: NonNullableFormBuilder, private modal: NzModalService, private message: NzMessageService
  ) { 
    this.validateForm = this.fb.group({
      nombre: ['', [Validators.required]],
      estado: [true],
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  copylistOfData = [...this.listDto];
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
    this.listDto = targetValue;
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      if(this.keyId === ''){
        this.servService.Save(this.validateForm.value)
        .subscribe(
          res => {
            this.message.create('success', `Registro creado con exito`);
            this.isVisible = false;
            this.getData();
            this.validateForm.reset();
          })
      } else {
        this.servService.Update(this.keyId, this.validateForm.value)
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
  showDeleteConfirm(key : string): void {
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
    this.servService.list()
      .subscribe(
        res => {
          let data: any = res;
          this.listDto = data;
          this.copylistOfData = [...data];
          this.isLoads = false;
        },
      )
  }
  eliminar(key: string) {
    this.servService.Remove(key)
      .subscribe(res => {
        this.message.create('success', `Registro eliminado con exito`);
        this.getData();
      })
  }
  update(data: any) {
    this.keyId = data._id;
    this.validateForm.controls['nombre'].setValue(data.nombre);
    this.validateForm.controls['estado'].setValue(data.estado);
    this.isVisible = true;
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
