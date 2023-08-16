import { Component, OnInit,inject } from '@angular/core';
import { Table123ListBaseComponent } from '@baseapp/table123/table123/table123-list/table123-list.base.component';
import { Table123Service } from '@baseapp/table123/table123/table123.service';


@Component({
  selector: 'app-table123-list',
  templateUrl: '../../../../../base/app/table123/table123/table123-list/table123-list.component.html',
  styleUrls: ['./table123-list.scss']
})
export class Table123ListComponent extends Table123ListBaseComponent implements OnInit {
 
	
  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }
 
}
