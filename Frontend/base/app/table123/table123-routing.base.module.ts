import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@baseapp/auth.can-deactivate-guard.service';

import { Table123DetailComponent } from '@app/table123/table123/table123-detail/table123-detail.component';
import { Table123ListComponent } from '@app/table123/table123/table123-list/table123-list.component';

export const routes: Routes = [

{
     path: 'table123detail',
     component: Table123DetailComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "TABLE123_DETAIL",
        breadcrumb: "TABLE123_DETAIL",
        roles : [
        			"all"
				]
     }
},
{
     path: 'table123list',
     component: Table123ListComponent,
     canDeactivate: [ CanDeactivateGuard ],
     data: {
     	label: "TABLE123_LIST",
        breadcrumb: "TABLE123_LIST",
        roles : [
        			"all"
				]
     }
}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class Table123BaseRoutingModule
{
}
