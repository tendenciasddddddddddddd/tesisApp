import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from '@modules/clientes/services/client-service.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.css']
})
export class ClientePageComponent implements OnInit {
  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isVisible = false;
  keyId: string = '';
  lisDto: any = [];
  validateForm: FormGroup<{
    email: FormControl<string>;
    identificacion: FormControl<string>;
    nombres: FormControl<string>;
    telefono: FormControl<string>;
    direccion: FormControl<string>;
  }>;
  constructor(private cliService: ClientServiceService,
    private fb: NonNullableFormBuilder, private modal: NzModalService, private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      identificacion: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
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
  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.keyId === '') {
        this.cliService.Save(this.validateForm.value)
          .subscribe(
            res => {
              this.message.create('success', `Registro creado con exito`);
              this.isVisible = false;
              this.getData();
              this.validateForm.reset();
            })
      } else {
        this.cliService.Update(this.keyId, this.validateForm.value)
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
    this.cliService.list()
      .subscribe(
        res => {
          let data: any = res;
          this.lisDto = data;
          this.copylistOfData = [...data];
          this.isLoads = false;
        },
      )
  }
  eliminar(key: string) {
    this.cliService.Remove(key)
      .subscribe(res => {
        this.message.create('success', `Registro eliminado con exito`);
        this.getData();
      })
  }
  update(data: any) {
    this.keyId = data._id;
    this.validateForm.controls['nombres'].setValue(data.nombres);
    this.validateForm.controls['identificacion'].setValue(data.identificacion);
    this.validateForm.controls['telefono'].setValue(data.telefono);
    this.validateForm.controls['email'].setValue(data.email);
    this.validateForm.controls['direccion'].setValue(data.direccion);
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
