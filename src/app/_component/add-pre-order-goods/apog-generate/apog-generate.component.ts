import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddGoodsComponent } from '../../pre-order-goods/generate/add-goods/add-goods.component';

@Component({
  selector: 'app-apog-generate',
  templateUrl: './apog-generate.component.html',
  styleUrls: ['./apog-generate.component.css']
})
export class ApogGenerateComponent implements OnInit {
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
        let tmp: Storage[] =[];
        this.goods = this.dataFromServer['goods'];

        this.dataSource = new MatTableDataSource(tmp);
        this.isLoadingResults = false;
        this.addGoods();
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
    this.model.action = 'extra-pre-order-save';
    this.model.access_token = localStorage.getItem('access_token');

    console.log(this.model);
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.spinner.hide();
        this.showSuccess(response['data']);
        this.router.navigate(['/add-pre-order-goods']);
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
        let tmpEmpty = this.goods.find(x => x.no_catalog===null);
        //console.log(tmpEmpty.no_catalog);
        this.removeEmptyRow()
    })

  }

  goBack() {
    this.router.navigate(['/add-pre-order-goods']);
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
  }

  removeEmptyRow():void {
    const goodsArray = <FormArray>this.goodsForm.controls['goods'];
    if (goodsArray.value[0].no_catalog == null) goodsArray.removeAt(0);
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



  // initUserRow(): FormGroup {
  //   // return this.formBuilder.group({
  //   //   no_catalog: ['0'],
  //   //   description: ['--'],
  //   //   quantity: ['1', [Validators.required]],
  //   // });
  // }

  addUserRow(): void {
    // const usersArray =
    //   <FormArray>this.goodsForm.controls['users'];
    // usersArray.push(this.initUserRow());
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