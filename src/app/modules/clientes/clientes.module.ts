import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    ClientePageComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    FormsModule,
    NzButtonModule,
    NzTypographyModule,
    NzModalModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzSkeletonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzMessageModule
  ]
})
export class ClientesModule { }
