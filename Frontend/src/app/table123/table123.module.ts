import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Table123RoutingModule } from './table123-routing.module';
import { Table123BaseModule } from '@baseapp/table123/table123.base.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    Table123BaseModule,
    Table123RoutingModule
    
  ],
  exports: [
      Table123BaseModule,
  ]

})
export class Table123Module  { }