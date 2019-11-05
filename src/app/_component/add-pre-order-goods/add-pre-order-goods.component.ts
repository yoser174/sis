import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'src/app/_service/export.service';
import { purchaseOrderHeader } from 'src/app/_models/purchase-order';

@Component({
  selector: 'app-add-pre-order-goods',
  templateUrl: './add-pre-order-goods.component.html',
  styleUrls: ['./add-pre-order-goods.component.css']
})
export class AddPreOrderGoodsComponent  implements OnInit {

  model: any = {};
  dataFromServer;
  isLoadingResults;
  dataSource;
  displayedColumns: string[] = ['status', 'number', 'created_date', 'created_by','validated_date','validated_by','comments' ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private router: Router,
    private dataService: DataService,
    private toastr: ToastrService,
    private exportService: ExportService) { }

  showSuccess() {
    this.toastr.success(`Goods out was added.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  exportTable(){
  this.exportService.exportExcel(this.dataSource.filteredData, 'pre-order-goods');
  }


  public loadData(){
    this.model.action = 'extra_pre_po_header';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        console.log(this.dataFromServer);
        let tmp: purchaseOrderHeader[] = this.dataFromServer['extra_pre_po_header'];

        this.dataSource = new MatTableDataSource(tmp);
        console.log(this.dataSource);
        this.isLoadingResults = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(this.dataSource);

      }
    }, error => {
      this.showError();
      this.isLoadingResults = false;
    });
  }


  ngOnInit() {
    this.loadData();
  }

  generate(){
    this.router.navigate(['/add-pre-order-goods/generate']);
  }

  

}
