import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.css']
})
export class EditStorageComponent {
  model: any = {};
  constructor(public dialogRef: MatDialogRef<EditStorageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private toastr: ToastrService) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showSuccess() {
    this.toastr.success(`"${this.data.storages}" updated.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  stopEdit(): void {
    this.model.action = 'storage-management_update';
    this.model.access_token = localStorage.getItem('access_token');
    this.model.form = this.data;
    console.log(this.model);
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.showSuccess();
      }
    }, error => {
      this.showError();
    });
  }
}