import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'src/app/_service/export.service';
import { GoodsConsumptionData } from 'src/app/_models/report';

@Component({
  selector: 'app-fulfillment-summary',
  templateUrl: './fulfillment-summary.component.html',
  styleUrls: ['./fulfillment-summary.component.css']
})
export class FulfillmentSummaryComponent implements OnInit {

  model: any = {};
  index;
  user_id;
  isLoadingResults;
  dataFromServer;
  dataSource;
  displayedColumns: string[] = ['number','created_date','no_catalog','description','quantity','fulfillment'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private exportService: ExportService
  ) { }


  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  exportTable(){
    this.exportService.exportExcel(this.dataSource.filteredData, 'report-fulfillment-summary');
  }

  public loadData() {
    this.isLoadingResults = true;
    this.model.action = 'report-fulfillment-summary';
    this.model.access_token = localStorage.getItem('access_token');
    console.log(this.model)
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        console.log(response['data'])
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        let tmp: GoodsConsumptionData[] = this.dataFromServer['fulfillment-summary_list'];

        this.dataSource = new MatTableDataSource(tmp);
        this.isLoadingResults = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    }, error => {
      this.showError();
      this.isLoadingResults = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  this.loadData();
  }

}
