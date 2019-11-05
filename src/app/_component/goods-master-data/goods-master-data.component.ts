import { DataService } from 'src/app/_service/data.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EditReagentComponent } from './dialogs/edit-reagent/edit-reagent.component';
import { reagentMasterData } from 'src/app/_models/reagent';


@Component({
  selector: 'app-goods-master-data',
  templateUrl: './goods-master-data.component.html',
  styleUrls: ['./goods-master-data.component.css']
})
export class GoodsMasterDataComponent implements OnInit {

  displayedColumns: string[] = ['no_catalog', 'description', 'uom', 'instrument', 'storages', 'min_stock', 'max_stock', 'actions'];
  isLoadingResults = true;
  dataSource;
  dataFromServer;
  model: any = {};
  instrument_list;
  storage_list;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private toastr: ToastrService,
    private dataService: DataService,
    public dialog: MatDialog) { }


  showSuccess() {
    this.toastr.success(`Goods out was added.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private refreshTable() {
    this.dataSource = [];
    this.loadData();
  }
  startEdit(no_catalog, description, uom, instrument, storages, min_stock, max_stock) {
    console.log(no_catalog, description, uom, instrument, storages, min_stock, max_stock, this.instrument_list, this.storage_list);
    let id_storage = "";
    if (this.storage_list) {
      for (let st of this.storage_list) {
        if (st.storages == storages) {
          id_storage = st.id_storage;
        }
      }
    }
    let id_instrument = "";
    if (this.instrument_list) {
      for (let ins of this.instrument_list) {
        if (ins.instrument == instrument) {
          id_instrument = ins.id_instrument;
        }
      }
    }

    const dialogRef = this.dialog.open(EditReagentComponent, {
      data: {
        no_catalog: no_catalog, description: description, uom: uom, id_instrument: id_instrument, id_storage: id_storage, min_stock: min_stock,
        max_stock: max_stock, instrument_list: this.instrument_list, storage_list: this.storage_list
      },
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.refreshTable();
      }
    })
  }

  public loadData(){
    this.model.action = 'goods-master-data';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        console.log(this.dataFromServer);
        let tmp: reagentMasterData[] = this.dataFromServer['reagent_data'];
        this.instrument_list = this.dataFromServer['instrument_list'];
        this.storage_list = this.dataFromServer['storage_list'];

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

  ngOnInit() {
    this.loadData();
  }

}


