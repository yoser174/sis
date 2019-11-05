import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-storage',
  templateUrl: './delete-storage.component.html',
  styleUrls: ['./delete-storage.component.css']
})
export class DeleteStorageComponent implements OnInit {

  model: any = {};

  constructor(public dialogRef: MatDialogRef<DeleteStorageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private toastr: ToastrService) { }

  ngOnInit() {
    console.log(this.data)
  }

  onNoClick(){
    this.dialogRef.close();
  }

  showSuccess() {
    this.toastr.success(`${this.data.storages} deleted.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  confirmDelete(){
    
    this.model.action = 'storage-management_delete';
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