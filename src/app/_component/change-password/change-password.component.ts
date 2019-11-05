import { Router } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  model: any = {};
  hide1 = true;
  hide2 = true;
  hide3 = true;

  constructor(private dataService: DataService,
    private toastr: ToastrService,
    private router: Router) { }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      '';
  }


  showSuccess() {
    this.toastr.success(`Updated.`, 'Success');
  }

  showWarning() {
    this.toastr.warning(`Your current password not valid.`, 'Failed');
  }

  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  changePassword() {
    console.log(this.model);
    this.model.action = 'change-password';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        if (response.data) {
          this.showSuccess();
          this.router.navigate(['/login']);
        }
        else {
          this.showWarning();
        }
      }
    }, error => {
      this.showError();
    });
  }

  ngOnInit() {
    this.model.token_data = this.dataService.getTokenData();
    this.model.form = {};
  }

}
