import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceivedData } from 'src/app/_models/report';
import { ExportService } from 'src/app/_service/export.service';

@Component({
  selector: 'app-report-goods-received',
  templateUrl: './report-goods-received.component.html',
  styleUrls: ['./report-goods-received.component.css']
})
export class ReportGoodsReceivedComponent implements OnInit {

 
  model: any = {};
  index;
  user_id;
  isLoadingResults;
  dataFromServer;
  dataSource;
  displayedColumns: string[] = ['no_catalog','description','quantity_in','storages','batch','expired_date','username','date'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private exportService: ExportService
  ) { }


  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  public loadData() {
    this.isLoadingResults = true;
    this.model.action = 'report-goods-received';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        let tmp: GoodsReceivedData[] = this.dataFromServer['goods_received_list'];

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


  exportTable(){
    this.exportService.exportExcel(this.dataSource.filteredData, 'report-goods-received');
  }

  ngOnInit() {
  this.loadData();
  }

}
