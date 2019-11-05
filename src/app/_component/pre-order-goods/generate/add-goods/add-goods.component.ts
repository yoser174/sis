import { reagentMasterData } from './../../../../_models/reagent';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { goodsSelectData } from 'src/app/_models/reagent';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-add-goods',
  templateUrl: './add-goods.component.html',
  styleUrls: ['./add-goods.component.css']
})
export class AddGoodsComponent{
  model: any = {};
  dataFromServer;
  isLoadingResults;
  dataSource;
  goodsCtrl = new FormControl();
  filteredGoods: Observable<goodsSelectData[]>;

  
  constructor(public dialogRef: MatDialogRef<AddGoodsComponent>,
    private dataService: DataService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: reagentMasterData[]) {
    this.filteredGoods = this.goodsCtrl.valueChanges
    .pipe(
      startWith(''),
      map(goods => goods ? this._filterGoods(goods): this.data.slice())
    )
  }

  confirmAdd(){
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  private _filterGoods(value: string): goodsSelectData[]{
    const filterValue = value.toLocaleLowerCase();

    return this.data.filter(goods => goods.description.toLocaleLowerCase().indexOf(filterValue) === 0 )

  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }
}