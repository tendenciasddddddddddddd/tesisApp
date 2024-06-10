import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalizadosRoutingModule } from './finalizados-routing.module';
import { FinalizadoPageComponent } from './pages/finalizado-page/finalizado-page.component';
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
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';


@NgModule({
  declarations: [
    FinalizadoPageComponent
  ],
  imports: [
    CommonModule,
    FinalizadosRoutingModule,
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
    NzMessageModule,
    NzGridModule,
    NzSpinModule,
    NzDrawerModule,
    NzSelectModule,
    NzDatePickerModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzIconModule,
    NzProgressModule
  ]
})
export class FinalizadosModule { }
