import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-goods-out',
  templateUrl: './goods-out.component.html',
  styleUrls: ['./goods-out.component.css']
})
export class GoodsOutComponent  {


  isSubmited: boolean;
  id_storage;
  id_instrument;
  model: any = {};
  dataFromServer: any = {};
  product: any = {};
  GoodsOutForm;
  earlier_ed_count = 0;
  earlier_ed : any = {};
  product_found_count = 1;
  product_found : any = {};

  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private dataService: DataService) {
    this.model.form = {};

    this.GoodsOutForm = this.formBuilder.group({
      storage_id: [this.product.storages, Validators.required],
      instrument_id: [this.id_instrument, Validators.required],
      quantity: ['1', Validators.required]
    });
  }

  showSuccess() {
    this.toastr.success(`Goods out was added.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  onSubmit(form) {

    this.model.action = 'goods-out_add';
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
    this.model.action = 'goods-out_qrcode';
    this.model.access_token = localStorage.getItem('access_token');

    this.dataService.getData(this.model).subscribe(response => {
      this.earlier_ed_count = 0;
      this.product_found_count = 0;
      if (response.status === 'success') {
        this.isSubmited = true;
        this.dataFromServer = response['data'];
        this.model.isValid = this.dataFromServer['isValid'];

        // get data product
        this.product.hospital =  this.dataFromServer['product']['hospital']; 
        this.product.no_catalog = this.dataFromServer['product']['no_catalog'];
        this.product.description = this.dataFromServer['product']['description'];
        this.product.storages = this.dataFromServer['product']['storages'];
        this.product.uom = this.dataFromServer['product']['uom'];
        this.product.lot = this.dataFromServer['product']['lot'];
        this.product.expired = this.dataFromServer['product']['expired'];
        this.product.ed_this_month = this.dataFromServer['product']['ed_this_month'];
        this.product.ed_not_this_month = this.dataFromServer['product']['ed_not_this_month'];
        this.product.storage_list = this.dataFromServer['product']['storage_list'];
        this.product.instrument_list = this.dataFromServer['product']['instrument_list'];
        this.product.instrument = this.dataFromServer['product']['instrument'];

        // earlier ed
        this.earlier_ed = this.dataFromServer['product']['earlier_ed'];

        // found
        this.product_found = this.dataFromServer['product']['product_found'];

        
        for (let e_ed of this.earlier_ed  ){ this.earlier_ed_count += 1; }
        for (let pf of this.product_found  ){ this.product_found_count += 1; }
        console.log(this.product_found_count);

        // get id_storage
        this.id_storage = "";
        if (this.product.storage_list) {
          for (let storage of this.product.storage_list) {
            if (storage.storages == this.product.storages) {
              this.id_storage = storage.id_storage;
            }
          }
        }
      }

      // get id_instrument
      this.id_instrument = "";
      if (this.product.instrument_list) {
        for (let instrument of this.product.instrument_list) {
          if (instrument.instrument == this.product.instrument) {
            this.id_instrument = instrument.id_instrument;
          }
        }
      }
      this.GoodsOutForm.patchValue({
        storage_id: this.id_storage, 
        instrument_id: this.id_instrument,
        quantity: '1'
      });
    
    }, error => {
      this.showError();
    });
  }
  
  resetQrCode() {
    this.model.qr_code = null;
    this.model.isValid = false;
    this.isSubmited = false;
    this.earlier_ed_count = 0;
    this.product_found_count = 1;
  }
}
