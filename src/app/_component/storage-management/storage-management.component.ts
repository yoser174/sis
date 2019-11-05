import { EditStorageComponent } from './dialogs/edit-storage/edit-storage.component';
import { AddStorageComponent } from './dialogs/add-storage/add-storage.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { UmDeleteDialogComponent } from '../user-management/dialogs/um-delete-dialog/um-delete-dialog.component';
import { Storage } from 'src/app/_models/storage';
import { DeleteStorageComponent } from './dialogs/delete-storage/delete-storage.component';

@Component({
  selector: 'app-storage-management',
  templateUrl: './storage-management.component.html',
  styleUrls: ['./storage-management.component.css']
})
export class StorageManagementComponent implements OnInit {

  model: any = {};
  index;
  user_id;
  isLoadingResults;
  dataFromServer;
  dataSource;
  displayedColumns: string[] = ['id_storage','storages', 'actions' ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  showSuccess() {
    this.toastr.success(`Goods out was added.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }


  addNew(){
    const dialogRef = this.dialog.open(AddStorageComponent, 
      { data : {  } });

      dialogRef.afterClosed().subscribe( result => {
        if(result === 1){
          this.refreshTable();
        }
      })

  }

  private refreshTable() {
    this.dataSource = [];
    this.loadData();
  }

  startEdit(i, id_storage, storages){
    this.index = i;
    const dialogRef = this.dialog.open(EditStorageComponent,
      { 
        data: {id_storage:id_storage, storages:storages }
      });

      dialogRef.afterClosed().subscribe( result => {
        if(result === 1){
          this.refreshTable();
        }
      })


  }

  deleteItem(i, id_storage, storages) {
    this.index = i;
    const dialogRef = this.dialog.open(DeleteStorageComponent, {
      data: {i: i, id_storage:id_storage, storages:storages }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }



  public loadData(){
    this.model.action = 'storage-management';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        console.log(this.dataFromServer);
        let tmp: Storage[] = this.dataFromServer['storage_list'];

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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.loadData();
  }

}
