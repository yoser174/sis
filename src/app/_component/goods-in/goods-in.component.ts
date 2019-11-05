import { DataService } from './../../_service/data.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-goods-in',
  templateUrl: './goods-in.component.html',
  styleUrls: ['./goods-in.component.css']
})
export class GoodsInComponent {

  isSubmited: boolean;
  id_storage;
  model: any = {};
  dataFromServer: any = {};
  product: any = {};
  GoodsInForm;

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dataService: DataService) {
    this.model.form = {};

    this.GoodsInForm = this.formBuilder.group({
      storage_id: [this.product.storages, Validators.required],
      quantity: ['1', Validators.required]
    });
  }

  showSuccess() {
    this.toastr.success('Goods in was added.', 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  onSubmit(form) {

    this.model.action = 'goods-in_add';
    this.model.access_token = localStorage.getItem('access_token');
    this.model.form = form;

    console.log(this.model);

    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'error' || response.message === 'Expired token') {
        this.dataService.logout();
      }
      if (response.status === 'success') {
        console.log(response);
        this.isSubmited = false;
        this.id_storage = "";
        this.model = {};
        this.dataFromServer = {};
        this.product = {};
        this.showSuccess();
      }
    }, error => {
      this.showError();
    });


  }

  qrEnter(value: string) {
    this.model.qr_code = value;
    this.model.action = 'goods-in_qrcode';
    this.model.access_token = localStorage.getItem('access_token');

    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isSubmited = true;
        this.dataFromServer = response['data'];
        this.model.isValid = this.dataFromServer['isValid'];

        // get data product
        this.product.no_catalog = this.dataFromServer['product']['no_catalog'];
        this.product.description = this.dataFromServer['product']['description'];
        this.product.storages = this.dataFromServer['product']['storages'];
        this.product.uom = this.dataFromServer['product']['uom'];
        this.product.lot = this.dataFromServer['product']['lot'];
        this.product.expired = this.dataFromServer['product']['expired'];
        this.product.ed_this_month = this.dataFromServer['product']['ed_this_month'];
        this.product.ed_not_this_month = this.dataFromServer['product']['ed_not_this_month'];
        this.product.storage_list = this.dataFromServer['product']['storage_list'];

        // get id_storage
        this.id_storage = "";
        //console.log(this.id_storage);
        if (this.product.storage_list) {
          for (let storage of this.product.storage_list) {
            if (storage.storages == this.product.storages) {
              this.id_storage = storage.id_storage;
            }
          }
        }
        this.GoodsInForm.patchValue({
          storage_id: this.id_storage, 
          quantity: '1'
        });
      }
    }, error => {
      this.showError();
    });




  }

  resetQrCode() {
    this.model.qr_code = null;
    this.model.isValid = false;
    this.isSubmited = false;
  }




}
