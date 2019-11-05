import { Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './../../_service/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { userData } from 'src/app/_models/user';
import { UmDeleteDialogComponent } from './dialogs/um-delete-dialog/um-delete-dialog.component';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  model: any = {};
  index;
  user_id;
  isLoadingResults;
  dataFromServer;
  dataSource;
  displayedColumns: string[] = ['id_card', 'username', 'full_name', 'email', 'last_login', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  showSuccess() {
    this.toastr.success(`Goods out was added.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  private refreshTable() {
    this.dataSource = [];
    this.loadData();
  }



  deleteItem(i: number, id_card: string, username: string, full_name: string, email: string, last_login: string) {
    this.index = i;
    console.log(i, id_card, username, full_name, email, last_login);
    const dialogRef = this.dialog.open(UmDeleteDialogComponent, {
      data: { i: i, id_card: id_card, username: username, full_name: full_name, email: email, last_login: last_login }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }



  public loadData() {
    this.model.action = 'user-management';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        console.log(this.dataFromServer);
        let tmp: userData[] = this.dataFromServer['user_data'];

        this.dataSource = new MatTableDataSource(tmp);
        console.log(this.dataSource);
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