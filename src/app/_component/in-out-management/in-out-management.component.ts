import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { InOut } from 'src/app/_models/in-out';

@Component({
  selector: 'app-in-out-management',
  templateUrl: './in-out-management.component.html',
  styleUrls: ['./in-out-management.component.css']
})
export class InOutManagementComponent implements OnInit {

  model: any = {};
  index;
  user_id;
  isLoadingResults;
  dataFromServer;
  dataSource;
  displayedColumns: string[] = ['action',
    'no_catalog',
    'description',
    'uom',
    'expired_date',
    'batch',
    'quantity',
    'storages',
    'instrument',
    'date',
    'username'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dataService: DataService,
    private toastr: ToastrService
  ) { }


  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }


  public loadData() {
    this.isLoadingResults = true;
    this.model.action = 'in-out-management';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        let tmp: InOut[] = this.dataFromServer['inout_list'];

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
