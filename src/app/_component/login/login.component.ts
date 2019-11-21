import { TranslateService } from '@ngx-translate/core';

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  invalidLoginCard: boolean = false;
  isApiError: boolean = false;
  submitted: boolean;
  model: any = {};
  
  isCardLogin = true;

  constructor(
    private dataService: DataService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.dataService.logout();
    this.model.lang = 'en';
  }
  toLogin() {
    this.isCardLogin = false;
  }

  toCard() {
    this.isCardLogin = true;
  }

  loginCard() {

    this.model.action = 'login-card';
    this.submitted = true;

    console.log(this.model);

    this.dataService.getData(this.model).subscribe(

      response => {
        if (response.status === 'success') {
          this.dataService.setUser(response)
        }
        else {
          this.invalidLoginCard = true
        }
      },
      error => {
        console.error(error);
        this.isApiError = true;
      }

    )
    this.submitted = false;
  }



  login() {
    this.model.action = 'login';
    this.submitted = true;

    console.log(this.model);

    this.dataService.getData(this.model).subscribe(

      response => {
        if (response.status === 'success') {
          this.dataService.setUser(response)
        }
        else {
          this.invalidLogin = true
        }
      },
      error => {
        console.error(error);
      }

    )
    this.submitted = false;
  }

  changeLang(value){
    this.translate.use(value);
    localStorage.setItem('lang',value);
  }

}
