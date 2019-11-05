import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-storage',
  templateUrl: './add-storage.component.html',
  styleUrls: ['./add-storage.component.css']
})
export class AddStorageComponent {
  model: any = {};

  constructor(public dialogRef: MatDialogRef<AddStorageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Storage,
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
    this.toastr.success(`"${this.data.storage}" added.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  public confirmAdd(): void {
    this.model.action = 'storage-management_add';
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

