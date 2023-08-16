import { NgModule } from '@angular/core';
import { Table123DetailComponent } from '@app/table123/table123/table123-detail/table123-detail.component';
import { SharedModule } from '@app/shared/shared.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WidgetsBaseModule } from '@baseapp/widgets/widgets.base.module';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';
import { Table123ListComponent } from '@app/table123/table123/table123-list/table123-list.component';
import { ExportsModule } from '@app/exports/exports.module';
import { ImportsModule } from '@app/imports/imports.module';

@NgModule({
  declarations: [
Table123DetailComponent,
Table123ListComponent
],
imports: [
SharedModule,
WidgetsBaseModule,
ImportsModule,
ExportsModule
],

exports: [
SharedModule,
WidgetsBaseModule,
Table123DetailComponent,
Table123ListComponent
],

providers: [
BsModalService,
CanDeactivateGuard
],
  
})
export class Table123BaseModule { }