import { Component, OnInit } from '@angular/core';
import { UserService } from '@modules/usuarios/services/user.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isVisible = false;
  show: boolean = true;
  isRoles = false;
  keyId: string = '';
  lisDto: any = [];
  lisRol: any = [];
  detalleUser: any = {};
  roladmin: boolean = false;
  rolsecretario: boolean = false;
  roltramitador: boolean = false;
  idAdmin: string = '';
  idSecretario: string = '';
  idTramitador: string = '';
  validateForm: FormGroup<{
    email: FormControl<string>;
    cedula: FormControl<string>;
    fullname: FormControl<string>;
    telefono: FormControl<string>;
    direccion: FormControl<string>;
    password: FormControl<string>;
    ifPassword: FormControl<string>;
  }>;
  constructor(private useService: UserService,
    private fb: NonNullableFormBuilder, private modal: NzModalService, private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      cedula: ['', [Validators.required]],
      fullname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
      direccion: ['', [Validators.required]],
      password: ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      ifPassword: ['',],
    });
  }

  ngOnInit(): void {
    this.getData();
    this.getRole()
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
      let newPass = this.validateForm.value.password
      let newPassIS = crypt(newPass);
      this.validateForm.controls['ifPassword'].setValue(newPassIS);
      if (this.keyId === '') {
        this.useService.Save(this.validateForm.value)
          .subscribe(
            res => {
              this.message.create('success', `Registro creado con exito`);
              this.isVisible = false;
              this.getData();
              this.validateForm.reset();
            },
            error => {
              this.message.create('error', `El usuario ya se encuantra registrado`);
            },)
      } else {
        this.useService.Update(this.keyId, this.validateForm.value)
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
  createPassword(apell: any, ced: any) {
    let l = apell.toLowerCase().charAt(0);
    let result = l + ced;
    return result;
  }
  showDeleteConfirm(key: string): void {
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
    this.useService.list()
      .subscribe(
        res => {
          let data: any = res;
          this.lisDto = data;
          this.copylistOfData = [...data];
          this.isLoads = false;
        },
      )
  }
  getRole() {
    this.useService.listRole()
      .subscribe(
        res => {
          let data: any = res;
          this.lisRol = data;
        },
      )
  }
  eliminar(key: string) {
    this.useService.Remove(key)
      .subscribe(res => {
        this.message.create('success', `Registro eliminado con exito`);
        this.getData();
      })
  }
  update(data: any) {
    let aux = crypt(data.ifPassword)
    this.keyId = data._id;
    this.validateForm.controls['fullname'].setValue(data.fullname);
    this.validateForm.controls['cedula'].setValue(data.cedula);
    this.validateForm.controls['telefono'].setValue(data.telefono);
    this.validateForm.controls['email'].setValue(data.email);
    this.validateForm.controls['direccion'].setValue(data.direccion);
    this.validateForm.controls['password'].setValue(aux);
    this.validateForm.controls['ifPassword'].setValue(data.ifPassword);
    this.isVisible = true;
  }
  role(data: any) {
    this.detalleUser = {}
    for (let i = 0; i < this.lisRol.length; i++) {
      const element = this.lisRol[i];
      if (element.name === 'Admin') {
        if (data.roles.includes(element._id)) this.roladmin = true
        else this.roladmin = false
      }
      if (element.name === 'Secretaria') {
        if (data.roles.includes(element._id)) this.rolsecretario = true
        else this.rolsecretario = false
      }
      if (element.name === 'Tramitador') {
        if (data.roles.includes(element._id)) this.roltramitador = true
        else this.roltramitador = false
      }
    }
    this.detalleUser = data
    this.isRoles = true;
  }
  onTramitador(role: any) {
    let filtro = this.lisRol.find((x: any) => x.name === role)
    let newId = filtro?._id
    if (newId) {
      if (this.roltramitador) {
        this.detalleUser.roles.push(newId);
      } else {
        this.detalleUser.roles.splice(this.detalleUser.roles.indexOf(newId), 1);
      }
      const model = { roles: this.detalleUser.roles }
      this.updateRoles(model)
    }
  }
  onSecretario(role: any) {
    let filtro = this.lisRol.find((x: any) => x.name === role)
    let newId = filtro?._id
    if (newId) {
      if (this.rolsecretario) {
        this.detalleUser.roles.push(newId);
      } else {
        this.detalleUser.roles.splice(this.detalleUser.roles.indexOf(newId), 1);
      }
      const model = { roles: this.detalleUser.roles }
      this.updateRoles(model)
    }
  }
  onAdmin(role: any) {
    let filtro = this.lisRol.find((x: any) => x.name === role)
    let newId = filtro?._id
    if (newId) {
      if (this.roladmin) {
        this.detalleUser.roles.push(newId);
      } else {
        this.detalleUser.roles.splice(this.detalleUser.roles.indexOf(newId), 1);
      }
      const model = { roles: this.detalleUser.roles }
      this.updateRoles(model)
    }
  }
  updateRoles(model : any){
    this.useService.UpdateRole(this.detalleUser?._id, model)
    .subscribe(
      res => {
        this.message.create('success', `Registro editado con exito`);
        this.isVisible = false;
        this.getData();
        this.validateForm.reset();
      })
  }
  showModal(): void {
    this.show = true;
    this.keyId = ''
    this.validateForm.reset();
    this.isVisible = true;
  }

  handleOk(): void {
    this.isRoles = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  handleCancelRole(): void {
    this.isRoles = false;
  }
}

const crypt = (data : any) => {
  try {
    const key = "imperio"
  var crypted = "";
  for (var i = 0; i < data.length; i++) {
    crypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  };
  return crypted;
  } catch (error) {
    return 'security'
  }
  
}
