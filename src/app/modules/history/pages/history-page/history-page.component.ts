import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';
import {FormControl,  FormGroup,  NonNullableFormBuilder,  Validators} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isVisible = false;
  keyUser: string ='';
  lisCliente: any = [];
  validateForm: FormGroup<{
    email: FormControl<string>;
    identificacion: FormControl<string>;
    nombres: FormControl<string>;
    telefono: FormControl<string>;
    direccion: FormControl<string>;
  }>;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  constructor(private searchService: SearchService,
    private fb: NonNullableFormBuilder, private modal: NzModalService
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
  submitForm(): void {
    if (this.validateForm.valid) {
      if(this.keyUser === ''){
        this.searchService.Guardar(this.validateForm.value)
        .subscribe(
          res => {
            this.isVisible = false;
            this.getData();
            this.validateForm.reset();
          })
      } else {
        this.searchService.Update(this.keyUser, this.validateForm.value)
        .subscribe(
          res => {
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
    console.log(key);
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar?',
      nzContent: '<b style="color: red;">Esta acción no se puede deshacer</b>',
      nzOkText: 'Emiminar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.eliminar(key),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  getData() {
    this.isLoads = true;
    this.searchService.listClientes()
      .subscribe(
        res => {
          let data: any = res;
          this.lisCliente = data;
          this.isLoads = false;
        },
      )
  }
  eliminar(key: string) {
    this.searchService.eliminar(key)
      .subscribe(res => {
        this.getData();
      })
  }
  update(data: any) {
    this.keyUser = data._id;
    this.validateForm.controls['nombres'].setValue(data.nombres);
    this.validateForm.controls['identificacion'].setValue(data.identificacion);
    this.validateForm.controls['telefono'].setValue(data.telefono);
    this.validateForm.controls['email'].setValue(data.email);
    this.validateForm.controls['direccion'].setValue(data.direccion);
    this.isVisible = true;
  }
  showModal(): void {
    this.keyUser = ''
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
