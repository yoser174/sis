import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-edit-reagent',
  templateUrl: './edit-reagent.component.html',
  styleUrls: ['./edit-reagent.component.css']
})
export class EditReagentComponent {
  model: any = {};

  constructor(public dialogRef: MatDialogRef<EditReagentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    console.log(this.data)
  }

  onNoClick(){
    this.dialogRef.close();
  }

  showSuccess() {
    this.toastr.success(`Updated.`, 'Success');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  stopEdit(){
    console.log(this.data);
    this.model.action = 'goods-master-data_update';
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
