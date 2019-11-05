import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-um-delete-dialog',
  templateUrl: './um-delete-dialog.component.html',
  styleUrls: ['./um-delete-dialog.component.css']
})
export class UmDeleteDialogComponent implements OnInit {
  model: any = {};

  constructor(public dialogRef: MatDialogRef<UmDeleteDialogComponent>,
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
    this.toastr.success(`Deleted.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  confirmDelete(){
    console.log(this.data);
    this.model.action = 'user-management_delete';
    this.model.access_token = localStorage.getItem('access_token');
    this.model.form = this.data;
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.showSuccess();
      }
    }, error => {
      this.showError();
    });
  }


}
