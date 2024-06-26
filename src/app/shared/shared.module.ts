import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { ImgBrokenDirective } from './directives/img-broken.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    SideBarComponent,
    HeaderUserComponent,
    ImgBrokenDirective

  ],
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule
  ],
  exports: [
    SideBarComponent,
    HeaderUserComponent,
    ImgBrokenDirective
  ]
})
export class SharedModule { }
