import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { SharedModule } from '@shared/shared.module';
import { SearchComponent } from './components/search/search.component';
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
//import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
//import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@NgModule({
  declarations: [
    HistoryPageComponent,
    SearchComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
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
    NzInputModule
    //NzFormTooltipIcon
  ]
})
export class HistoryModule { }
