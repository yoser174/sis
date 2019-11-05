import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceivedData, GoodsConsumptionData } from 'src/app/_models/report';
import { ExportService } from 'src/app/_service/export.service';

@Component({
  selector: 'app-report-goods-consumptions',
  templateUrl: './report-goods-consumptions.component.html',
  styleUrls: ['./report-goods-consumptions.component.css']
})
export class ReportGoodsConsumptionsComponent implements OnInit {


  model: any = {};
  index;
  user_id;
  isLoadingResults;
  dataFromServer;
  dataSource;
  displayedColumns: string[] = ['no_catalog','description','quantity_out','storages','instrument','username','date'];

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
    this.exportService.exportExcel(this.dataSource.filteredData, 'report-goods-consumption');
  }

  public loadData() {
    this.isLoadingResults = true;
    this.model.action = 'report-goods-consumption';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        let tmp: GoodsConsumptionData[] = this.dataFromServer['goods_consumption_list'];

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
