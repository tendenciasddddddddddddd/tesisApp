import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    FormsModule,
    NzButtonModule,
    NzTypographyModule,
    NzModalModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzMessageModule,
    NzGridModule,
    NzSpinModule,
    NzCheckboxModule,
    NzIconModule
  ]
})
export class UsuariosModule { }
