import { Component, OnInit } from '@angular/core';
import { AgenciaService } from '@modules/agencia/services/agencia.service';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-agencia-page',
  templateUrl: './agencia-page.component.html',
  styleUrls: ['./agencia-page.component.css'],
})
export class AgenciaPageComponent implements OnInit {
  cloudName = "stebann"; 
  uploadPreset = "zxrlydi4"; 
  myWidget: any;
  listResults$: Observable<any> = of([])
  isLoads: boolean = false;
  isVisible = false;
  keyId: string = '';
  imagePath : string = '';
  lisDto: any = [];
  validateForm: FormGroup<{
    email: FormControl<string>;
    telefono: FormControl<string>;
    ruc: FormControl<string>;
    razonSocial: FormControl<string>;
    dirMatriz: FormControl<string>;
    dirEstablecimiento: FormControl<string>;
    nombreComercial: FormControl<string>;
    codDoc: FormControl<string>;
    establecimiento: FormControl<string>;
    obligadoContabilidad: FormControl<string>;
    logo: FormControl<string>;
  }>;
  constructor(private ageService: AgenciaService,
    private fb: NonNullableFormBuilder, private message: NzMessageService,) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      telefono: ['', [Validators.required]],
      dirMatriz: ['', [Validators.required]],
      ruc: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
      dirEstablecimiento: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      codDoc: ['', [Validators.required]],
      establecimiento: ['', [Validators.required]],
      obligadoContabilidad: ['', [Validators.required]],
      logo: [''],
    });
  }

  ngOnInit(): void {
    this.getData();
    this.myWidget = (window as any).cloudinary.createUploadWidget(
      {
        sources: ['image_search', 'local', 'camera', 'google_drive'],
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        cropping: true,
        croppingCoordinatesMode: 'custom',
        multiple: false,
      },
      (error:any, result:any,) => {
        if (!error && result && result.event === "success") {
          //console.log("Done! Here is the image info: ", result.info);
          this.imagePath = result.info.secure_url
        }
      }
    );
  }
  openWidget() {
    this.myWidget.open();
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.validateForm.controls['logo'].setValue(this.imagePath);
      this.ageService.Update(this.keyId, this.validateForm.value)
        .subscribe(
          res => {
            this.message.create('success', `Registro editado con exito`);
            this.isVisible = false;
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
  getData() {
    this.isLoads = true;
    this.ageService.list()
      .subscribe(
        res => {
          let data: any = res;
          const { ruc, razonSocial, email, telefono, dirMatriz, dirEstablecimiento,
            nombreComercial, codDoc, establecimiento, obligadoContabilidad, _id, logo
          } = data
          this.validateForm.controls['ruc'].setValue(ruc);
          this.validateForm.controls['razonSocial'].setValue(razonSocial);
          this.validateForm.controls['email'].setValue(email);
          this.validateForm.controls['telefono'].setValue(telefono);
          this.validateForm.controls['dirMatriz'].setValue(dirMatriz);
          this.validateForm.controls['dirEstablecimiento'].setValue(dirEstablecimiento);
          this.validateForm.controls['nombreComercial'].setValue(nombreComercial);
          this.validateForm.controls['codDoc'].setValue(codDoc);
          this.validateForm.controls['establecimiento'].setValue(establecimiento);
          this.validateForm.controls['obligadoContabilidad'].setValue(obligadoContabilidad);
          this.validateForm.controls['logo'].setValue(logo);
          this.keyId = _id
          this.imagePath = logo
          this.isLoads = false;
        },
      )
  }
}
