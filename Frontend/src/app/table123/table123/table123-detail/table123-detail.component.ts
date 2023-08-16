import { Component, OnInit,inject } from '@angular/core';
import { Table123DetailBaseComponent } from '@baseapp/table123/table123/table123-detail/table123-detail.base.component';
import { Table123Service } from '@baseapp/table123/table123/table123.service';


@Component({
  selector: 'app-table123-detail',
  templateUrl: '../../../../../base/app/table123/table123/table123-detail/table123-detail.component.html',
  styleUrls: ['./table123-detail.scss']
})
export class Table123DetailComponent extends Table123DetailBaseComponent implements OnInit {
 
	
  ngAfterViewInit(): void {
    this.onAfterViewInit()
  }

  ngOnInit(): void {
    super.onInit();
  }
 
}
