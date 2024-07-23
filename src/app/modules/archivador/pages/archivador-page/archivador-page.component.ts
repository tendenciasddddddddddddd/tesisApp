import { Component, OnInit } from '@angular/core';
import { ArchivaService } from '@modules/archivador/services/archiva.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  selector: 'app-archivador-page',
  templateUrl: './archivador-page.component.html',
  styleUrls: ['./archivador-page.component.css']
})
export class ArchivadorPageComponent implements OnInit {
  /* */
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  cloudName = "stebann";
  uploadPreset = "zxrlydi4";
  myWidget: any;
  imagePath: string = '';

  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isLoad: boolean = false;
  isVisible = false;
  isVisibleArchivador = false;
  isVisiblePagos = false;
  isVisibleComprobante = false;
  isVisibleAbonos = false;
  isLoading = false;
  keyId: string = '';
  keyIdSelected: string = '';
  rowService: any = {};
  usuario: any = {}
  lisDto: any = [];
  rowRequirimiento: any = [];
  listOfPagos: any = [];
  lisCliente: any = [];
  lisServices: any = [];
  departamento: string = '';
  selectedValue = null;
  validateForm: FormGroup<{
    canton: FormControl<string>;
    parroquia: FormControl<string>;
    mts: FormControl<string>;
    provincia: FormControl<string>;
    total: FormControl<string>;
    sector: FormControl<string>;
    cliente: FormControl<string>;
    servicio: FormControl<string>;
    estado: FormControl<boolean>;
  }>;
  tipo: string = '';
  monto: string = '';
  totalAbonos: number = 0;
  porcAbonos: number = 0;
  facturaHtml: any = {};
  userControl = new FormControl('');
  temporal: any = {}
  form2 = new FormGroup({
    tipo: this.userControl,
    monto: this.userControl,
  });
  roles: any = []
  rolAdmin: boolean = false;
  rolTramitador: boolean = false;
  rolSecretaria: boolean = false;
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.nombres === o2.nombres : o1 === o2);
  compareFn2 = (o1: any, o2: any): boolean => (o1 && o2 ? o1.nombre === o2.nombre : o1 === o2);
  constructor(private arcService: ArchivaService,
    private fb: NonNullableFormBuilder, private modal: NzModalService, private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      canton: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      parroquia: ['', [Validators.required]],
      mts: ['',],
      provincia: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      total: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
      estado: [false],
    });
  }

  ngOnInit(): void {
    this.getData();
    this.getClient();
    this.getServicios()
    this.myWidget = (window as any).cloudinary.createUploadWidget(
      {
        sources: ['image_search', 'local', 'camera', 'google_drive'],
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        multiple: false,
      },
      (error: any, result: any,) => {
        if (!error && result && result.event === "success") {
          const arr = result?.info.path.split(".");
          let info = {
            link: result?.info.secure_url,
            tipo: arr[arr.length - 1],
            size: result?.info.bytes,
            name: result?.info.original_filename,
            formato: result?.info.format,
          }
          this.editCache[this.keyIdSelected].data.archivos.push(info)
        }
      }
    );
    this.usuario = localStorage.getItem('Usuario');
    this.usuario = JSON.parse(this.usuario)
    this.roles = this.usuario?.role;
    if(this.roles.includes('Admin'))this.rolAdmin = true;
    if(this.roles.includes('Tramitador'))this.rolTramitador = true;
    if(this.roles.includes('Secretaria'))this.rolSecretaria = true;
  }
  openWidget(id: any) {
    this.keyIdSelected = id;
    this.myWidget.open();
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
  finalizarTramite() {
    try {
      if (this.listOfData.length === 0) {
        this.message.create('error', `Error, no existen requerimientos`);
        return
      }
      const ifPendiente = this.listOfData.filter(d => d.estadoTramite === "PENDIENTE")
      if (ifPendiente.length > 0) {
        this.message.create('error', `Error, existen requerimientos pendientes`);
        return
      }
      const model = { estado: true }
      this.isLoad = true;
      this.arcService.Update(this.rowService?._id, model)
        .subscribe(
          res => {
            this.message.create('success', `Tramite finalizado con exito`);
            this.isLoad = false;
            this.handleArchiCancel()
            this.getData();
            this.validateForm.reset();
          })
    } catch (error) {
      console.log(error);
    }
  }
  
  aperturarTramite() {
    try {
      if (this.listOfData.length === 0) {
        this.message.create('error', `Error, no existen requerimientos`);
        return
      }
      // const ifPendiente = this.listOfData.filter(d => d.estadoTramite === "PENDIENTE")
      // if (ifPendiente.length > 0) {
      //   this.message.create('error', `Error, existen requerimientos pendientes`);
      //   return
      // }
      const model = { estado: false }
      this.isLoad = true;
      this.arcService.Update(this.rowService?._id, model)
        .subscribe(
          res => {
            this.message.create('success', `Tramite aperturado con exito`);
            this.isLoad = false;
            this.handleArchiCancel()
            this.getData();
            this.validateForm.reset();
          })
    } catch (error) {
      console.log(error);
    }
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

  /*Matrix de archivos */
  showModalArchiva(data: any): void {
    if(!this.rolAdmin && !this.rolTramitador)return;
    this.rowService = data
    this.getDataById(this.rowService?._id)
    this.isVisibleArchivador = true;
  }
  handleArchiCancel(): void {
    this.isVisibleArchivador = false;
  }
  addItem(): void {
    const ifPendiente = this.listOfData.filter(d => d.estadoTramite === "PENDIENTE")
    if (ifPendiente.length > 0) {
      this.message.create('error', `Error, existen requerimientos pendientes`);
      return
    }
    try {
      let info = {
        fecha: new Date(),
        departamento: 'N/A',
        asunto: 'N/A',
        responsable: this.usuario,
        archivos: [],
        nombreDoc: 'N/A',
        estadoTramite: 'PENDIENTE',
      }
      this.isLoad = true;
      this.arcService.saveRequerimiento(this.rowService?._id, info)
        .subscribe(
          res => {
            this.message.create('success', `Requerimiento creado con exito`);
            this.isLoad = false;
            this.getDataById(this.rowService?._id)
          })

    } catch (error) {
      this.isLoad = false;
    }
  }
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item._id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    this.editCache[id].edit = false;
    let model = {
      keyReqm: id,
      data: this.editCache[id].data
    }
    this.arcService.updateRequerimiento(this.rowService?._id, model)
      .subscribe(res => {
        this.message.create('success', `Requerimiento actualizado con exito`);
        this.getDataById(this.rowService?._id)
      })
  }
  deleteRow(id: string): void {
    try {
      this.listOfData = this.listOfData.filter(d => d._id !== id);
      let model = { keyReqm: id }
      this.arcService.removeRequerimiento(this.rowService?._id, model)
        .subscribe(res => {
          this.message.create('success', `Requerimiento eliminado con exito`);
          this.getDataById(this.rowService?._id)
        })
    } catch (error) {
    }
  }
  deleteFile(id: string, nameFile: any, files: any): void {
    let filess = files.filter((d: any) => d._id !== nameFile?._id);
    this.editCache[id].data.archivos = filess
    const index = this.listOfData.findIndex(item => item._id === id);
    this.listOfData[index].archivos = filess
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
  submitPagos() {
    let isMonto = Number(this.monto)
    if (isMonto <= 0 || isNaN(isMonto)) {
      this.message.create('error', `Error en el valor del pago`);
      return
    }
    if (this.tipo == '' || !this.tipo) {
      this.message.create('error', `Error en la forma de pago`);
      return
    }
    let allPagos = Number(this.monto) + Number(this.totalAbonos)
    let allTotal = Number(this.rowService.total)
    if (allPagos > allTotal) {
      this.message.create('error', `Error el total de pagos supera el total a pagar`);
      return
    }
    const model = {
      tipo: this.tipo,
      monto: this.monto,
      fecha: new Date(),
      text: `Abono servicio ${this.rowService?.cliente?.nombres}`
    }
    this.arcService.updateAbona(this.rowService?._id, model)
      .subscribe(res => {
        this.message.create('success', `Pago registrado con exito`);
        this.tipo = ''
        this.monto = ''
        this.getDataByIdPagos(this.rowService?._id)
      })
      this.getData();
  }
  deleteRowPagos(id: string): void {
    try {
      let model = { keyPagos: id }
      this.arcService.removePagos(this.rowService?._id, model)
        .subscribe(res => {
          this.message.create('success', `Pago eliminado con exito`);
          this.getDataByIdPagos(this.rowService?._id)
        })
        this.getData();
    } catch (error) {
    }
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
  printAbonos(data: any): void {
    this.getComprobanteAbono(data)
    this.temporal = data
    this.isVisibleAbonos = true;
  }
  getComprobanteAbono(data: string) {
    this.isLoad = true;
    const model = {data:data, info:this.rowService, abonos:this.totalAbonos}
    this.arcService.ComprobanteAbonos(model)
      .subscribe(
        res => {
          let data: any = res;
          this.facturaHtml = data
          this.isLoad = false;
        },
      )
  }
  builfPdfAbonos() {
    try {
      this.isLoad = true;
      const model = {data:this.temporal, info:this.rowService, abonos:this.totalAbonos}
      this.arcService.builfPdfAbonos(model)
        .subscribe(
          res => {
            let data: any = res;
            let a = document.createElement('a');
            a.target = '_blank';
            a.href = data
            a.click();
            this.isLoad = false;
          },
        )
    } catch (error) {
      this.isLoad = false;
    }
  }
}
