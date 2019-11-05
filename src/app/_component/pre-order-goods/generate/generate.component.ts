import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { AddGoodsComponent } from './add-goods/add-goods.component';
import { NgxSpinnerService } from "ngx-spinner";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'quantity'];
  dataSource;
  goodsForm: FormGroup;
  errorMessage: string;
  model: any = {};
  isLoadingResults;
  dataFromServer;
  goods;

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService) { }

    displayProgressSpinner = true;


  ngOnInit() {
    this.goodsForm = this.formBuilder.group({
      goods: this.formBuilder.array([
        this.formBuilder.group({
          no_catalog: [null],
          description: [null],
          quantity: [null, [Validators.required]]
        })
      ])
    });
    this.loadData();
  }

  showSuccess(message) {
    this.toastr.success(`${message} was added.`, 'Success');
  }
  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  public loadData() {
    this.spinner.show();
    this.model.action = 'pre-order-generate';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];

        console.log(this.dataFromServer);
        let tmp: Storage[] = this.dataFromServer['pre_order_goods_generate'];
        this.goods = this.dataFromServer['goods'];

        this.dataSource = new MatTableDataSource(tmp);
        console.log(this.dataSource);
        this.isLoadingResults = false;
        this.addGoodRow();

      }
    }, error => {
      this.showError();
    });
    this.spinner.hide();
  }

  inserGoodsRow(no_catalog, desctiption) {
    return this.formBuilder.group({
      no_catalog: [no_catalog],
      description: [desctiption],
      quantity: ['1', [Validators.required]],
    });
  }

  saveForm(values) {
    this.spinner.show();
    this.model.form = values;
    this.model.action = 'pre-order-save';
    this.model.access_token = localStorage.getItem('access_token');

    console.log(this.model);
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.spinner.hide();
        this.showSuccess(response['data']);
        this.router.navigate(['/pre-order-goods']);
      }
    }, error => {
      this.showError();
      this.spinner.hide();
    });
    
  }

  addGoods() {
    const dialogRef = this.dialog.open(AddGoodsComponent,
      {
        data: this.goods
      });
    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        let tmp = this.goods.find(x => x.no_catalog===result);
        let goodsControl = <FormArray>this.goodsForm.controls.goods;
        goodsControl.push(this.formBuilder.group({ no_catalog: tmp.no_catalog, description: tmp.description, quantity: "1" }))
    })

  }

  goBack() {
    this.router.navigate(['/pre-order-goods']);
  }

  get DynamicFormControls() {

    return <FormArray>this.goodsForm.get('goods');
  }


  addGoodRow() {
    let goodsControl = <FormArray>this.goodsForm.controls.goods;
    const goodsGenerate = this.dataFromServer['pre_order_goods_generate'];

    goodsGenerate.forEach(goods => {
      goodsControl.push(this.formBuilder.group({ no_catalog: goods.no_catalog, description: goods.description, quantity: goods.quantity }))
    })
    this.removeGoodsRow(0);
  }

  removeGoodsRow(rowIndex: number): void {
    const goodsArray = <FormArray>this.goodsForm.controls['goods'];
    if (goodsArray.length > 1) {
      goodsArray.removeAt(rowIndex);
    } else {
      this.errorMessage = 'You cannot delete this row! form should contain at least one row!';
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    }
  }



  initUserRow(): FormGroup {
    return this.formBuilder.group({
      no_catalog: ['123'],
      description: ['avaga'],
      quantity: ['1', [Validators.required]],
    });
  }

  addUserRow(): void {
    const usersArray =
      <FormArray>this.goodsForm.controls['users'];
    usersArray.push(this.initUserRow());
  }

  removeUserRow(rowIndex: number): void {
    const usersArray = <FormArray>this.goodsForm.controls['users'];
    if (usersArray.length > 1) {
      usersArray.removeAt(rowIndex);
    } else {
      this.errorMessage = 'You cannot delete this row! form should contain at least one row!';
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    }
  }

}