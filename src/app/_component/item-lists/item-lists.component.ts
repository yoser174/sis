import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'src/app/_service/export.service';
import { GoodsConsumptionData } from 'src/app/_models/report';

@Component({
  selector: 'app-item-lists',
  templateUrl: './item-lists.component.html',
  styleUrls: ['./item-lists.component.css']
})
export class ItemListsComponent implements OnInit {

  model: any = {};
  index;
  user_id;
  isLoadingResults;
  dataFromServer;
  dataSource;
  displayedColumns: string[] = ['gtin','no_catalog','PL3','PL5','description','uom','instrument'];

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
    this.exportService.exportExcel(this.dataSource.filteredData, 'item-lists');
  }

  public loadData() {
    this.isLoadingResults = true;
    this.model.action = 'item-lists';
    this.model.access_token = localStorage.getItem('access_token');
    console.log(this.model)
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        console.log(response['data'])
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        let tmp: GoodsConsumptionData[] = this.dataFromServer['item-lists'];

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
