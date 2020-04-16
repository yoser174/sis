import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/app/_service/data.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'bs-header',
  templateUrl: './bs-header.component.html',
  styleUrls: ['./bs-header.component.css']
})
export class BsHeaderComponent implements OnInit {

  model: any = {};
  isProduction;
  isSidebarIcon: boolean = false;
  isLoadingResults;
  dataFromServer;
  notifications;
  user_hospital;
  selected_hospital;
  select_disabled:boolean=false;

  constructor(
    private dataService: DataService,
    public translate: TranslateService,
    private toastr: ToastrService
  ) { }

  
  showError() {
    this.toastr.error('Something bad happened; Please try again later.', 'Major Error');
  }

  updateDefaultHospital(){

    // console.log('Ganti ke hospital ID :'+this.selected_hospital)
    this.model.action = 'set-user-hospital';
    this.model.access_token = localStorage.getItem('access_token');
    this.model.user_hospital = this.selected_hospital;
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        this.notifications = this.dataFromServer['notification'];

      }
    }, error => {
      this.showError();
      this.isLoadingResults = false;
    });
  }

  loadUserHospital(){
    this.isLoadingResults = true;
    this.model.action = 'list-user-hospital';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        this.user_hospital = this.dataFromServer['user_hospital'];
        let h_count = 0;

        for (let hospital of this.user_hospital){
          h_count ++;
          if (hospital.unit_default == '1'){
            this.selected_hospital = hospital.id_hospital 
          }
        }
        if (h_count <= 1) this.select_disabled = true;
      }
    }, error => {
      this.showError();
      this.isLoadingResults = false;
    });
  }


  loadNotif(){
    this.isLoadingResults = true;
    this.model.action = 'dashboard-notifications';
    this.model.access_token = localStorage.getItem('access_token');
    this.dataService.getData(this.model).subscribe(response => {
      if (response.status === 'success') {
        this.isLoadingResults = true;
        this.dataFromServer = response['data'];
        this.notifications = this.dataFromServer['notification'];

      }
    }, error => {
      this.showError();
      this.isLoadingResults = false;
    });
  }

  activeOffCanvas(){
    console.log("data");
  }

  ngOnInit() {
    this.model.token_data = this.dataService.getTokenData();
    this.isProduction = environment.production;
    this.translate.use(localStorage.getItem('lang'));
    this.loadUserHospital();
  }

  logout() {
    this.dataService.logout();
  }

  clickSidebarIcon() {
    const body = document.getElementsByTagName('body')[0];
    if (!this.isSidebarIcon) {
      body.classList.remove('sidebar-icon-only');
      this.isSidebarIcon = true;
    }
    else {
      body.classList.add('sidebar-icon-only');
      this.isSidebarIcon = false;
    }
  }
}
